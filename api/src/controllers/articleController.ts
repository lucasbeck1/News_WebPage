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

type searchArticle = {
  author?: {
    name: string;
  };
};

type dataUpdate = {
  headline?: string;
  drophead?: string;
  body?: string;
  image?: string;
  section?: Section;
};

// ------------------------------------------------------------------

export const getAllArticles = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 0;
  try {
    const allArticles = await Article.find({
      relations: {
        author: true,
        section: true,
      },
      select: {
        id: true,
        headline: true,
        drophead: true,
        body: true,
        image: true,
        createdAt: true,
        updatedAt: true,
        author: { name: true },
        section: { name: true },
      },
      skip: page * 100,
      take: 100,
      order: {
        createdAt: "DESC",
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

// ------------------------------------------------------------------

export const getArticlesByAuthor = async (req: Request, res: Response) => {
  try {
    const { name } = req.query;
    const page = Number(req.query.page) || 0;
    const search: searchArticle = {};

    if (name) {
      search.author = {
        name: name.toString(),
      };
    } else {
      return res.status(404).json({ message: "Response Error" });
    }

    const allArticles = await Article.find({
      where: search,
      relations: {
        author: true,
        section: true,
      },
      select: {
        id: true,
        headline: true,
        drophead: true,
        body: true,
        image: true,
        createdAt: true,
        updatedAt: true,
        author: { name: true },
        section: { name: true },
      },
      skip: page * 100,
      take: 100,
      order: {
        createdAt: "DESC",
      },
    });
    return res.status(200).json(allArticles);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message || "Error" });
    } else {
      return res.status(500).json({ message: "Response Error" });
    }
  }
};

// ------------------------------------------------------------------

export const getOneArticle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const oneArticle = await Article.findOne({
      where: {
        id: Number(id),
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

// ------------------------------------------------------------------

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

    return res.status(201).json({ message: "Create succesfull" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Response Error" });
    }
  }
};

// ------------------------------------------------------------------

export const updateArticle = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const article = await Article.findOneBy({ id: parseInt(id) });
    if (!article) return res.status(404).json({ message: "Not article found" });

    const { headline, drophead, body, image, section } = req.body;

    const newProperties: dataUpdate = {};

    if (headline) {
      newProperties.headline = headline;
    }

    if (drophead) {
      newProperties.drophead = drophead;
    }

    if (body) {
      newProperties.body = body;
    }

    if (image) {
      newProperties.image = image;
    }

    if (section) {
      const findSection = await Section.findOneBy({ name: section });
      if (!findSection) {
        return res.status(404).json({ message: "No section found" });
      }
      newProperties.section = findSection;
    }

    await Article.update({ id: parseInt(id) }, newProperties);

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

// ------------------------------------------------------------------

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
