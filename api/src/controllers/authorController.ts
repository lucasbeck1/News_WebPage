import { Request, Response } from "express";
import { Author } from "../entities/authorEntity";
import { saltRounds } from "../config";
import bcrypt from "bcrypt";

type authorCreateType = {
  name: string;
  mail: string;
  password: string;
  adminKey: string;
};

type authorUpdateType = {
  name?: string;
  mail?: string;
  password?: string;
  admin?: boolean;
};

// ------------------------------------------------------------------

export const getAllAuthors = async (_req: Request, res: Response) => {
  try {
    const allAuthors = await Author.find({
      select: {
        name: true,
        mail: true,
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

// ------------------------------------------------------------------

export const getOneAuthor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const oneAuthor = await Author.findOne({
      where: {
        id: id,
      },
      select: {
        name: true,
        mail: true,
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

// ------------------------------------------------------------------

export const createAuthor = async (
  req: Request<unknown, unknown, authorCreateType>,
  res: Response
) => {
  try {
    const { name, mail, password, adminKey } = req.body;
    if (!name || !mail || !password || !adminKey) {
      return res.status(404).json({ message: "Invalid Request" });
    }

    const adminUser = await Author.findOne({
      where: {
        id: adminKey,
      },
      select: {
        admin: true,
      },
    });

    if (!adminUser || !adminUser.admin) {
      return res.status(404).json({ message: "Invalid Request" });
    }

    const authorCreation = new Author();
    authorCreation.name = name;
    authorCreation.mail = mail;

    const salt: string = await bcrypt.genSalt(saltRounds);
    const hash: string = await bcrypt.hash(password, salt);
    authorCreation.password = hash;

    await authorCreation.save();
    return res
      .status(201)
      .json(`User ${authorCreation.name} created succesfully`);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Response Error" });
    }
  }
};

// ------------------------------------------------------------------

export const updateAuthor = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const author = await Author.findOneBy({ id: id });
    if (!author) return res.status(404).json({ message: "Not author found" });

    const { name, mail, admin, oldPassword, newPassword, adminKey } = req.body;

    const propertiesUpdated: authorUpdateType = {};

    let checkPass: boolean;

    if (oldPassword) {
      checkPass = await bcrypt.compare(oldPassword, author.password);
    } else if (adminKey) {
      const adminUser = await Author.findOne({
        where: {
          id: adminKey,
        },
        select: {
          admin: true,
        },
      });

      if (!adminUser || !adminUser.admin) {
        return res.status(400).json({ message: "Invalid Request" });
      }

      checkPass = true;
    } else {
      return res.status(400).json({ message: "Invalid Request" });
    }

    if (checkPass && name) {
      propertiesUpdated.name = name;
    }
    if (checkPass && mail) {
      propertiesUpdated.mail = mail;
    }
    if (admin) {
      propertiesUpdated.admin = admin;
    }

    if (checkPass && oldPassword && newPassword) {
      const salt: string = await bcrypt.genSalt(saltRounds);
      const hashPassword: string = await bcrypt.hash(newPassword, salt);
      propertiesUpdated.password = hashPassword;
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

// ------------------------------------------------------------------

export const deleteAuthor = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { adminKey } = req.body;

  try {
    const adminUser = await Author.findOne({
      where: {
        id: adminKey,
      },
      select: {
        admin: true,
      },
    });

    if (!adminUser || !adminUser.admin) {
      return res.status(404).json({ message: "Invalid Request" });
    }

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
