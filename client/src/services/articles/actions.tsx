import { storeArticles } from "../../reducers/sliceArticles";
import { AppDispatch } from "../../store";
import { getApiArticles } from "./api";
import { getStaticArticles } from "./static";

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

export { getArticles };
