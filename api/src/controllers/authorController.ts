import { Request, Response } from "express";
import { Author } from "../entities/authorEntity";

type authorType = {
  name: string;
  mail: string;
  password: string;
};

export const getAll = async (_req: Request, res: Response) => {
  try {
    const getAuthor = await Author.find();
    return res.status(200).json(getAuthor);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Response Error" });
    }
  }
};

export const getOne = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const getAuthor = await Author.findOneBy({ id: parseInt(id) });

    if (!getAuthor)
      return res.status(404).json({ message: "Author not found" });

    return res.status(200).json(getAuthor);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Response Error" });
    }
  }
};

export const createAuthor = async (
  req: Request<unknown, unknown, authorType>,
  res: Response
) => {
  try {
    const { name, mail, password } = req.body;
    const authorCreation = new Author();
    authorCreation.name = name;
    authorCreation.mail = mail;
    authorCreation.password = password;

    await authorCreation.save();
    return res.status(201).json(authorCreation);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Response Error" });
    }
  }
};

export const updateAuthor = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const author = await Author.findOneBy({ id: parseInt(id) });
    if (!author) return res.status(404).json({ message: "Not author found" });

    await Author.update({ id: parseInt(id) }, req.body);

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

export const deleteAuthor = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await Author.delete({ id: parseInt(id) });
    if (result.affected === 0) {
      return res.status(404).json({ message: "Author not found" });
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
