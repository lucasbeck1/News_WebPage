import { Request, Response } from "express";
import { Section } from "../entities/sectionEntity";
import { Article } from "../entities/articleEntity";

type createSectionType = {
  name: string;
};

type sectionType = {
  id: number;
  name: string;
  quantity?: number;
};

export const getAllSections = async (_req: Request, res: Response) => {
  try {
    const allSections: sectionType[] = await Section.find();

    for (let i = 0; i < allSections.length; i++) {
      const articlesBySection = await Article.count({
        where: { section: { name: allSections[i].name } },
      });
      allSections[i].quantity = articlesBySection;
    }

    return res.status(200).json(allSections);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Response Error" });
    }
  }
};

export const getOneSection = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const oneSection = await Section.findOne({
      where: {
        id: parseInt(id),
      },
      relations: {
        articles: { author: true },
      },
    });

    if (!oneSection)
      return res.status(404).json({ message: "Section not found" });

    return res.status(200).json(oneSection);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Response Error" });
    }
  }
};

export const createSection = async (
  req: Request<unknown, unknown, createSectionType>,
  res: Response
) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(404).json({ message: "More data is required" });
    }

    const sectionCreation = new Section();
    sectionCreation.name = name;

    await sectionCreation.save();
    return res.status(201).json(sectionCreation);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Response Error" });
    }
  }
};

export const updateSection = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const section = await Section.findOneBy({ id: parseInt(id) });
    if (!section) return res.status(404).json({ message: "Not section found" });

    await Section.update({ id: parseInt(id) }, req.body);

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

export const deleteSection = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await Section.delete({ id: parseInt(id) });
    if (result.affected === 0) {
      return res.status(404).json({ message: "Section not found" });
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
