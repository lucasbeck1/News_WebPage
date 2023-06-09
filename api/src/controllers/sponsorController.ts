import { Request, Response } from "express";
import { Sponsor } from "../entities/sponsorEntity";
import { saltRounds } from "../config/keys.config";
import bcrypt from "bcrypt";

type sponsorType = {
  name: string;
  mail: string;
  password: string;
};

// ------------------------------------------------------------------

export const getAllSponsor = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 0;

    const allSponsor = await Sponsor.find({
      order: {
        name: "ASC",
      },
      skip: page * 100,
      take: 100,
    });
    return res.status(200).json(allSponsor);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Response Error" });
    }
  }
};

// ------------------------------------------------------------------

export const getOneSponsor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const oneSponsor = await Sponsor.findOne({
      where: {
        id: id,
      },
      relations: {
        publicities: true,
      },
    });

    if (!oneSponsor)
      return res.status(404).json({ message: "Sponsor not found" });

    return res.status(200).json(oneSponsor);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Response Error" });
    }
  }
};

// ------------------------------------------------------------------

export const createSponsor = async (
  req: Request<unknown, unknown, sponsorType>,
  res: Response
) => {
  try {
    const { name, mail, password } = req.body;
    const RegEXP_User = /[`ª!@#$%^*_+=[\]{};'"\\|,<>/~]/;
    const RegEXP_Mail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const RegEXP_Password = /[`'"]/;

    if (!name || !mail || !password) {
      return res.status(404).json({ message: "Invalid Request" });
    } else if (
      typeof name !== "string" ||
      typeof mail !== "string" ||
      typeof password !== "string"
    ) {
      return res.status(404).json({ message: "Invalid Request" });
    } else if (RegEXP_User.test(name)) {
      return res.status(404).json({ message: "Invalid Request" });
    } else if (!RegEXP_Mail.test(mail)) {
      return res.status(404).json({ message: "Invalid Request" });
    } else if (RegEXP_Password.test(password)) {
      return res.status(404).json({ message: "Invalid Request" });
    }

    const sponsorNew = new Sponsor();
    sponsorNew.mail = mail;
    sponsorNew.name = name;

    const salt: string = await bcrypt.genSalt(saltRounds);
    const hash: string = await bcrypt.hash(password, salt);
    sponsorNew.password = hash;

    await sponsorNew.save();

    return res.status(201).json({ message: "Register Succesfull" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Response Error" });
    }
  }
};

// ------------------------------------------------------------------

export const updateSponsor = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const sponsor = await Sponsor.findOneBy({ id: id });
    if (!sponsor) return res.status(404).json({ message: "Not sponsor found" });

    await Sponsor.update({ id: id }, req.body);

    //return res.sendStatus(204);
    return res.status(201).json({ message: "Update succesfull" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Response Error" });
    }
  }
};

// ------------------------------------------------------------------

export const deleteSponsor = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await Sponsor.delete({ id: id });
    if (result.affected === 0) {
      return res.status(404).json({ message: "Sponsor not found" });
    }
    return res.status(202).json({ message: "Delete succesfull" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Response Error" });
    }
  }
};
