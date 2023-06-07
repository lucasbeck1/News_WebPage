import { Request, Response } from "express";
import { Publicity } from "../entities/publicityEntity";
import { Sponsor } from "../entities/sponsorEntity";

type publicityType = {
  image: string;
  active: boolean;
  start: Date;
  finish: Date;
  payment: JSON;
  name: string;
};

type searchPublicity = {
  sponsor?: {
    name: string;
  };
};

// ------------------------------------------------------------------

export const getAllPublicity = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 0;

    const allPublicity = await Publicity.find({
      relations: {
        sponsor: true,
      },
      select: {
        id: true,
        image: true,
        active: true,
        finished: true,
        approved: true,
        start: true,
        finish: true,
        sponsor: { name: true },
      },
      order: {
        finish: "DESC",
      },
      skip: page * 100,
      take: 100,
    });

    return res.status(200).json(allPublicity);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Response Error" });
    }
  }
};

// ------------------------------------------------------------------

export const getActivePublicity = async (_req: Request, res: Response) => {
  try {
    const allPublicity = await Publicity.find({
      where: {
        active: true,
      },
      select: {
        id: true,
        image: true,
        active: true,
        finished: true,
        approved: true,
        start: true,
        finish: true,
        sponsor: { name: true },
      },
      order: {
        finish: "DESC",
      },
      take: 200,
    });

    return res.status(200).json(allPublicity);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Response Error" });
    }
  }
};

// ------------------------------------------------------------------

export const getPublicityBySponsor = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const page = Number(req.query.page) || 0;
    const search: searchPublicity = {};

    if (!name) {
      return res.status(404).json({ message: "Invalid Request" });
    }

    const allPublicity = await Publicity.find({
      where: search,
      order: {
        finish: "DESC",
      },
      skip: page * 100,
      take: 100,
    });

    return res.status(200).json(allPublicity);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Response Error" });
    }
  }
};

// ------------------------------------------------------------------

export const getOnePublicity = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const onePublicity = await Publicity.findOne({
      where: {
        id: parseInt(id),
      },
      relations: {
        sponsor: true,
      },
      select: {
        id: true,
        image: true,
        active: true,
        finished: true,
        approved: true,
        start: true,
        finish: true,
        sponsor: { name: true },
      },
    });

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

// ------------------------------------------------------------------

export const createPublicity = async (
  req: Request<unknown, unknown, publicityType>,
  res: Response
) => {
  try {
    const { image, start, finish, payment, name } = req.body;

    if (!image || !start || !finish || !payment || !name) {
      return res.status(404).json({ message: "More data is required" });
    }

    const publicityNew = new Publicity();

    if (start) {
      publicityNew.active = true;
    } else {
      publicityNew.active = false;
    }

    publicityNew.image = image;
    publicityNew.start = start;
    publicityNew.finish = finish;
    publicityNew.payment = payment;

    const sponsor = await Sponsor.findOneBy({ name: name });
    if (sponsor) {
      publicityNew.sponsor = sponsor;
    }
    await publicityNew.save();

    return res.status(201).json({ message: "Create succesfull" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Response Error" });
    }
  }
};

// ------------------------------------------------------------------

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

// ------------------------------------------------------------------

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
