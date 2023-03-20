import { Request, Response } from "express";

type article = {
  title: string;
  body: string;
};

const article1: article = {
  title: "Great Hotel",
  body: "In mendoza city",
};

const article2: article = {
  title: "New Cirque",
  body: "In mendoza city",
};

const news: article[] = [article1, article2];

export const getArticles = (_req: Request, res: Response) => {
  return res.status(200).json(news);
};
