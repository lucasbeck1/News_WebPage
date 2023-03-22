import { Request, Response } from "express";
import { Sponsor } from "../entities/sponsorEntity";

type sponsorType = {
  mail: string;
  password: string;
};

export const getAllSponsor = async (_req: Request, res: Response) => {
  try {
    const allSponsor = await Sponsor.find({
      relations: {
        publicities: true,
      },
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

export const getOneSponsor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const oneSponsor = await Sponsor.findOneBy({
      id: parseInt(id),
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

export const createSponsor = async (
  req: Request<unknown, unknown, sponsorType>,
  res: Response
) => {
  try {
    const { mail, password } = req.body;
    const sponsorNew = new Sponsor();
    sponsorNew.mail = mail;
    sponsorNew.password = password;
    await sponsorNew.save();

    return res.status(201).json(sponsorNew);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Response Error" });
    }
  }
};

export const updateSponsor = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const sponsor = await Sponsor.findOneBy({ id: parseInt(id) });
    if (!sponsor) return res.status(404).json({ message: "Not sponsor found" });

    await Sponsor.update({ id: parseInt(id) }, req.body);

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

export const deleteSponsor = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await Sponsor.delete({ id: parseInt(id) });
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
