import { Request, Response } from "express";
import { Author } from "../entities/authorEntity";
import bcrypt from "bcrypt";

type loginRequest = {
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
      // Cookie assignment
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
  _req: Request<unknown, unknown, loginRequest>,
  res: Response
) => {
  try {
    // Cookie deletion
    res.clearCookie("name", { signed: false, sameSite: "strict" });
    res.clearCookie("admin", { signed: false, sameSite: "strict" });
    res.clearCookie("connect.sid", {
      signed: true,
      sameSite: "none",
      httpOnly: true,
    });

    return res.json({ message: "Loggout Succesfull" });
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};
