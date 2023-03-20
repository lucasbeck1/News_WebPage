import { Request, Response } from "express";
import { Article } from "../entities/articleEntity";

//{
//  getAll,
//  getOne,
//  createArticle,
//  updateArticle,
//  deleteArticle,
//}

type articleType = {
  headline: string;
  drophead: string;
  body: string;
  image: string;
};

export const getAll = async (_req: Request, res: Response) => {
  try {
    const getArticles = await Article.find();
    return res.status(200).json(getArticles);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Response Error" });
    }
  }
};

export const getOne = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const getArticle = await Article.findOneBy({ id: parseInt(id) });

    if (!getArticle)
      return res.status(404).json({ message: "Article not found" });

    return res.status(200).json(getArticle);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Response Error" });
    }
  }
};

export const createArticle = async (
  req: Request<unknown, unknown, articleType>,
  res: Response
) => {
  try {
    const { headline, drophead, body, image } = req.body;
    const articleNew = new Article();
    articleNew.headline = headline;
    articleNew.drophead = drophead;
    articleNew.body = body;
    articleNew.image = image;

    await articleNew.save();
    return res.status(201).json(articleNew);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Response Error" });
    }
  }
};

export const updateArticle = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const article = await Article.findOneBy({ id: parseInt(id) });
    if (!article) return res.status(404).json({ message: "Not article found" });

    await Article.update({ id: parseInt(id) }, req.body);

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

export const deleteArticle = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await Article.delete({ id: parseInt(id) });
    if (result.affected === 0) {
      return res.status(404).json({ message: "Article not found" });
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
