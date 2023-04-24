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

const initialState: Article[] = [];

const articleSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    addArticle(state, action: PayloadAction<Article>) {
      state.push(action.payload);
    },
    storeArticles(state, action: PayloadAction<Article[]>) {
      return (state = action.payload);
    },
  },
});

export const { addArticle, storeArticles } = articleSlice.actions;

export default articleSlice.reducer;
