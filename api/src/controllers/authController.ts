import { Request, Response } from "express";
import { Author } from "../entities/authorEntity";
import { saltRounds } from "../config";
import bcrypt from "bcrypt";

type loginRequest = {
  mail: string;
  password: string;
};

type registerRequest = {
  name: string;
  mail: string;
  password: string;
};

// ------------------------------------------------------------------

export const login = async (
  req: Request<unknown, unknown, loginRequest>,
  res: Response
) => {
  try {
    const { mail, password } = req.body;
    if (!mail || !password)
      return res.status(404).json({ message: "Missing data" });
    const author = await Author.findOneBy({ mail: mail });
    if (!author) return res.status(404).json({ message: "Invalid Request" });

    const checkPass: boolean = await bcrypt.compare(password, author.password);
    if (checkPass) {
      res.cookie("id", author.id, { signed: true, sameSite: "strict" });
      res.cookie("name", author.name, { signed: false, sameSite: "strict" });
      res.cookie("admin", author.admin, { signed: false, sameSite: "strict" });
      return res.status(200).json({ message: "Loggin Succesfull" });
    } else {
      return res.status(404).json({ message: "Invalid Request" });
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Response Error" });
    }
  }
};

// ------------------------------------------------------------------

export const logOut = async (
  req: Request<unknown, unknown, loginRequest>,
  res: Response
) => {
  // Cookies that have not been signed
  console.log("Cookies: ", req.cookies);
  // Cookies that have been signed
  console.log("Signed Cookies: ", req.signedCookies);

  try {
    res.clearCookie("id", { signed: true, sameSite: "strict" });
    res.clearCookie("name", { signed: false, sameSite: "strict" });
    res.clearCookie("admin", { signed: false, sameSite: "strict" });
    return res.json({ message: "Loggout Succesfull" });
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};

// ------------------------------------------------------------------

export const register = async (
  req: Request<unknown, unknown, registerRequest>,
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
