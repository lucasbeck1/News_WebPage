import { Request, Response } from "express";
import { Article } from "../entities/articleEntity";
import { Author } from "../entities/authorEntity";
import { Section } from "../entities/sectionEntity";

type articleType = {
  headline: string;
  drophead: string;
  body: string;
  image: string;
  author: string;
  section: string;
};

export const getAllArticles = async (_req: Request, res: Response) => {
  try {
    const allArticles = await Article.find({
      relations: {
        author: true,
        section: true,
      },
    });
    return res.status(200).json(allArticles);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Response Error" });
    }
  }
};

export const getOneArticle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const oneArticle = await Article.findOne({
      where: {
        id: parseInt(id),
      },
      relations: {
        author: true,
        section: true,
      },
    });

    if (!oneArticle)
      return res.status(404).json({ message: "Article not found" });

    return res.status(200).json(oneArticle);
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
    const { headline, drophead, body, image, author, section } = req.body;
    const articleNew = new Article();
    articleNew.headline = headline;
    articleNew.drophead = drophead;
    articleNew.body = body;
    articleNew.image = image;

    const findAuthor = await Author.findOneBy({ name: author });
    const findSection = await Section.findOneBy({ name: section });
    if (!headline || !drophead || !body || !image || !author || !section) {
      return res.status(404).json({ message: "More data is required" });
    }
    if (!findAuthor) {
      return res.status(404).json({ message: "No author found" });
    }
    if (!findSection) {
      return res.status(404).json({ message: "No section found" });
    }

    articleNew.author = findAuthor;
    articleNew.section = findSection;

    await articleNew.save();
    //await dataSource.manager.save(articleNew);

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
