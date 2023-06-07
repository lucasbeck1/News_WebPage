import { Request, Response } from "express";
import { Author } from "../entities/authorEntity";
import { Sponsor } from "../entities/sponsorEntity";

import bcrypt from "bcrypt";

type loginRequest = {
  mail: string;
  password: string;
  username: string;
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

// ------------------------------------------------------------------

export const loginSponsor = async (
  req: Request<unknown, unknown, loginRequest>,
  res: Response
) => {
  try {
    const { mail, password } = req.body;
    if (!mail || !password)
      return res.status(404).json({ message: "Missing data" });
    const sponsor = await Sponsor.findOneBy({ mail: mail });
    if (!sponsor) return res.status(404).json({ message: "Invalid Request" });

    const checkPass: boolean = await bcrypt.compare(password, sponsor.password);
    if (checkPass) {
      // Cookie assignment
      res.cookie(
        "sid",
        { id: sponsor.id, name: sponsor.id },
        {
          signed: true,
          sameSite: "none",
          httpOnly: true,
        }
      );
      res.cookie("name", sponsor.name, { signed: false, sameSite: "strict" });
      res.cookie("sponsor", true, { signed: false, sameSite: "strict" });

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

export const logOutSponsor = async (
  _req: Request<unknown, unknown, loginRequest>,
  res: Response
) => {
  try {
    // Cookie deletion
    res.clearCookie("connect.sid", {
      signed: true,
      sameSite: "none",
      httpOnly: true,
    });
    res.clearCookie("name", { signed: false, sameSite: "strict" });
    res.clearCookie("sponsor", { signed: false, sameSite: "strict" });

    return res.json({ message: "Loggout Succesfull" });
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};
