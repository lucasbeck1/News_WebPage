import { Request, Response, NextFunction } from "express";
import { Author } from "../entities/authorEntity";

// ------------------------------------------------------------------

export const adminVerification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.signedCookies;
  const { name, admin } = req.cookies;

  if (!id || !name || !admin || admin !== "true") {
    return res.status(404).json({ message: "Invalid request" });
  }

  const adminAuthor = await Author.findOne({
    where: { id: id },
    select: { name: true, admin: true },
  });

  if (!adminAuthor || adminAuthor.name !== name || adminAuthor.admin !== true) {
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
  const { id } = req.signedCookies;
  const { name, admin } = req.cookies;

  if (!id || !name || !admin || admin !== "false") {
    return res.status(404).json({ message: "Invalid request" });
  }

  const adminAuthor = await Author.findOne({
    where: { id: id },
    select: { name: true, admin: true },
  });

  if (
    !adminAuthor ||
    adminAuthor.name !== name ||
    adminAuthor.admin !== false
  ) {
    return res.status(400).json({ message: "Invalid request" });
  }

  return next();
};
