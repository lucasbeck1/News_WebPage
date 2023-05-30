import { Request, Response } from "express";
import { Author } from "../entities/authorEntity";
import { saltRounds } from "../config/keys.config";
import bcrypt from "bcrypt";

type authorCreateType = {
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

// ------------------------------------------------------------------

export const getAllAuthors = async (_req: Request, res: Response) => {
  try {
    const allAuthors = await Author.find({
      select: {
        id: true,
        name: true,
        mail: true,
        admin: true,
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
        id: true,
        name: true,
        mail: true,
        admin: true,
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

    const authorCreation = new Author();
    authorCreation.name = name;
    authorCreation.mail = mail;

    const salt: string = await bcrypt.genSalt(saltRounds);
    const hash: string = await bcrypt.hash(password, salt);
    authorCreation.password = hash;

    await authorCreation.save();
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

export const updateAuthor = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const author = await Author.findOneBy({ id: id });
    if (!author) return res.status(404).json({ message: "Not author found" });

    const { name, mail, admin, oldPassword, newPassword } = req.body;

    const propertiesUpdated: authorUpdateType = {};

    let checkPass: boolean;

    if (oldPassword) {
      checkPass = await bcrypt.compare(oldPassword, author.password);
    } else {
      checkPass = false;
    }

    if (checkPass !== true) {
      return res.status(404).json({ message: "Invalid request" });
    }

    if (admin === "true") {
      propertiesUpdated.admin = true;
    } else if (admin === "false") {
      propertiesUpdated.admin = false;
    }

    if (name) {
      propertiesUpdated.name = name;
    }
    if (mail) {
      propertiesUpdated.mail = mail;
    }

    if (newPassword) {
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
