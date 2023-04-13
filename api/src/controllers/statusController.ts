import { Request, Response } from "express";

// ------------------------------------------------------------------

export const statusApi = (_req: Request, res: Response) => {
  return res.status(200).send("Status Ok");
};
