import { Request, Response, NextFunction } from "express";

type Usertype = {
  id?: string;
  admin?: boolean;
  name?: string;
};

// ------------------------------------------------------------------

export const adminVerification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: Usertype | undefined = req.user;
  const { name, admin } = req.cookies;

  if (!user || !user.id || !name || !admin || admin !== "true") {
    return res.status(404).json({ message: "Invalid request" });
  }
  if (user.name !== name || user.admin !== true) {
    return res.status(400).json({ message: "Invalid request" });
  }

  return next();
};

// ------------------------------------------------------------------

export const authorVerification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: Usertype | undefined = req.user;
  const { name, admin } = req.cookies;

  if (!user || !user.id || !name || !admin || admin !== "false") {
    return res.status(404).json({ message: "Invalid request" });
  }

  if (user.name !== name || user.admin !== false) {
    return res.status(400).json({ message: "Invalid request" });
  }

  return next();
};

// ------------------------------------------------------------------

export const sponsorVerification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sponsorData = req.signedCookies.sid;
  const { name } = req.cookies;

  if (!sponsorData || !sponsorData.id || !sponsorData.name || !name) {
    return res.status(404).json({ message: "Invalid request" });
  }

  if (sponsorData.name !== name) {
    return res.status(404).json({ message: "Invalid request" });
  }

  return next();
};
