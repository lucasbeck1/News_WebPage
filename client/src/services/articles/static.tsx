import articles from "../../dataExamples/articles.json";

type Article = {
  id: number;
  headline: string;
  drophead: string;
  body: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  author: { name: string };
  section: { name: string };
};

type ArticleCreation = {
  headline: string;
  drophead: string;
  body: string;
  image: string;
  author: string;
  section: string;
};

type dataUpdate = {
  headline?: string;
  drophead?: string;
  body?: string;
  image?: string;
  section?: string;
};

let allArticles: Article[] = articles;

function getStaticArticles(): Article[] {
  return allArticles;
}

function createStaticArticle(data: ArticleCreation) {
  const actualDate: Date = new Date();
  let year: string = actualDate.getFullYear().toString();
  let month: string = (actualDate.getMonth() + 1).toString();
  let day: string = actualDate.getDate().toString();
  let miliseconds: number = actualDate.getMilliseconds() * 2000;

  if (month.length === 1) {
    month = "0" + month;
  }

  const dateStorage: string = year + "-" + month + "-" + day;

  const newID: number = Math.ceil(
    miliseconds / Math.ceil(Math.random() * 1000)
  );

  const newArticle: Article = {
    id: newID,
    headline: data.headline,
    drophead: data.drophead,
    body: data.body,
    image: data.image,
    createdAt: dateStorage,
    updatedAt: dateStorage,
    author: { name: data.author },
    section: { name: data.section },
  };

  const newArticlesArray = [newArticle].concat(allArticles);
  allArticles = newArticlesArray;

  return { message: "Create succesfull" };
}

function updateStaticArticle(data: dataUpdate, id: number) {
  const articleToUpdate = allArticles.find((article) => article.id === id);

  if (!articleToUpdate) {
    return { message: "Not article found" };
  }

  const index = allArticles.findIndex((article) => article.id === id);

  const actualDate: Date = new Date();
  let year: string = actualDate.getFullYear().toString();
  let month: string = (actualDate.getMonth() + 1).toString();
  let day: string = actualDate.getDate().toString();
  if (month.length === 1) {
    month = "0" + month;
  }
  const dateStorage: string = year + "-" + month + "-" + day;

  const newArticle: Article = {
    id: articleToUpdate.id,
    headline: data.headline || articleToUpdate.headline,
    drophead: data.drophead || articleToUpdate.drophead,
    body: data.body || articleToUpdate.body,
    image: data.image || articleToUpdate.image,
    createdAt: articleToUpdate.createdAt,
    updatedAt: dateStorage,
    section: { name: data.section || articleToUpdate.section.name },
    author: { name: articleToUpdate.author.name },
  };

  allArticles[index] = newArticle;

  return { message: "Update succesfull" };
}

function deleteStaticArticle(id: number) {
  const index = allArticles.findIndex((article) => article.id === id);

  if (index < 0) {
    return { message: "Not article found" };
  }

  allArticles.splice(index, 1);

  return { message: "Update succesfull" };
}

export {
  getStaticArticles,
  createStaticArticle,
  updateStaticArticle,
  deleteStaticArticle,
};
