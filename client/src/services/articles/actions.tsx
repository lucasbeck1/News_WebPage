import { storeArticles } from "../../reducers/sliceArticles";
import { AppDispatch } from "../../store";
import { getApiArticles, createApiArticle } from "./api";
import { getStaticArticles, createStaticArticle } from "./static";

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

async function getArticles(dispatch: AppDispatch): Promise<{
  payload: Article[];
  type: "articles/storeArticles";
}> {
  let getArts: Article[] = await getApiArticles();

  if (!getArts.length) {
    getArts = getStaticArticles();
  }

  return dispatch(storeArticles(getArts));
}

async function createArticle(
  data: ArticleCreation
): Promise<{ message: string }> {
  let createArt: { message: string } = await createApiArticle(data);

  if (createArt.message === "REQUEST ERROR") {
    createArt = createStaticArticle(data);
  }
  return createArt;
}

export { getArticles, createArticle };
