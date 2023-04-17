import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Article {
  id: number;
  headline: string;
  drophead: string;
  body: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  author: { name: string };
  section: { name: string };
}

interface ArticleState {
  articles: Article[];
}

const initialState: ArticleState = {
  articles: [],
};

const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    addArticle(state, action: PayloadAction<Article>) {
      state.articles.push(action.payload);
    },
    getArticles(state, action: PayloadAction<Article[]>) {
      state.articles = action.payload;
    },
  },
});

export const { addArticle, getArticles } = articleSlice.actions;

export default articleSlice.reducer;
