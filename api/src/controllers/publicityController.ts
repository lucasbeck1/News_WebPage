import { Request, Response } from "express";
import { Publicity } from "../entities/publicityEntity";
import { Sponsor } from "../entities/sponsorEntity";

type publicityType = {
  image: string;
  active: boolean;
  start: Date;
  finish: Date;
  payment: JSON;
  sponsorId: number;
};

export const getAllPublicity = async (_req: Request, res: Response) => {
  try {
    const allPublicity = await Publicity.find();

    return res.status(200).json(allPublicity);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Response Error" });
    }
  }
};

export const getOnePublicity = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const onePublicity = await Publicity.findOneBy({ id: parseInt(id) });

    if (!onePublicity)
      return res.status(404).json({ message: "Publicity not found" });

    return res.status(200).json(onePublicity);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Response Error" });
    }
  }
};

export const createPublicity = async (
  req: Request<unknown, unknown, publicityType>,
  res: Response
) => {
  try {
    const { image, active, start, finish, payment, sponsorId } = req.body;
    const publicityNew = new Publicity();
    publicityNew.image = image;
    publicityNew.active = active;
    publicityNew.start = start;
    publicityNew.finish = finish;
    publicityNew.payment = payment;

    const sponsor = await Sponsor.findOneBy({ id: sponsorId });
    if (sponsor) {
      publicityNew.sponsor = sponsor;
    }
    await publicityNew.save();

    return res.status(201).json(publicityNew);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Response Error" });
    }
  }
};

export const updatePublicity = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const publicity = await Publicity.findOneBy({ id: parseInt(id) });
    if (!publicity)
      return res.status(404).json({ message: "Not publicity found" });

    await Publicity.update({ id: parseInt(id) }, req.body);

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

export const deletePublicity = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await Publicity.delete({ id: parseInt(id) });
    if (result.affected === 0) {
      return res.status(404).json({ message: "Publicity not found" });
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
