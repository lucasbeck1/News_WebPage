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

function getStaticArticles(): Article[] {
  return articles;
}

export { getStaticArticles };
