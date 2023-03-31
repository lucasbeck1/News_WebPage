import { Request, Response } from "express";
import { Author } from "../entities/authorEntity";
import { saltRounds } from "../config";
import bcrypt from "bcrypt";

type authorType = {
  name: string;
  mail: string;
  password: string;
};

type authorUpdateType = {
  name?: string;
  mail?: string;
  password?: string;
  admin?: boolean;
};

export const getAllAuthors = async (_req: Request, res: Response) => {
  try {
    const allAuthors = await Author.find({
      relations: {
        articles: true,
      },
    });
    return res.status(200).json(allAuthors);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Response Error" });
    }
  }
};

export const getOneAuthor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const oneAuthor = await Author.findOne({
      where: {
        id: id,
      },
      relations: {
        articles: { section: true },
      },
    });

    if (!oneAuthor)
      return res.status(404).json({ message: "Author not found" });

    return res.status(200).json(oneAuthor);
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

    const salt: string = await bcrypt.genSalt(saltRounds);
    const hash: string = await bcrypt.hash(password, salt);
    authorCreation.password = hash;

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
    const author = await Author.findOneBy({ id: id });
    if (!author) return res.status(404).json({ message: "Not author found" });

    const { name, mail, admin, oldPassword, newPassword } = req.body;

    const propertiesUpdated: authorUpdateType = {};

    if (name) {
      propertiesUpdated.name = name;
    }
    if (mail) {
      propertiesUpdated.mail = mail;
    }
    if (admin) {
      propertiesUpdated.admin = admin;
    }

    if (oldPassword && newPassword) {
      const checkPass: boolean = await bcrypt.compare(
        oldPassword,
        author.password
      );

      if (checkPass) {
        const salt: string = await bcrypt.genSalt(saltRounds);
        const hash: string = await bcrypt.hash(newPassword, salt);
        const hashPassword: string = hash;
        propertiesUpdated.password = hashPassword;
      } else {
        return res.status(400).json({ message: "Invalid Request" });
      }
    }

    await Author.update({ id: id }, propertiesUpdated);

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
    const result = await Author.delete({ id: id });
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
