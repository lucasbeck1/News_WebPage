import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  articles: string[];
}

const initialState: UserState = {
  articles: [],
};

const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    addArticle(state, action: PayloadAction<string>) {
      state.articles.push(action.payload);
    },
  },
});

export const { addArticle } = articleSlice.actions;

export default articleSlice.reducer;
