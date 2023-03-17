import { Application, Request, Response } from "express";

export const statusApi = (app: Application): void => {
  app.get("/", (_req: Request, res: Response) => {
    return res.status(200).send("Status Ok");
  });
};
