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

const allArticles: Article[] = articles;

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

  allArticles.push(newArticle);

  return { message: "Create succesfull" };
}

export { getStaticArticles, createStaticArticle };
