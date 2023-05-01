import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Author = {
  id: string;
  admin: boolean;
  name: string;
  mail: string;
  password?: string;
};

const initialState: Author[] = [];

const userSlice = createSlice({
  name: "authors",
  initialState,
  reducers: {
    addAuthor(state, action: PayloadAction<Author>) {
      state.push(action.payload);
    },
    storeAuthors(state, action: PayloadAction<Author[]>) {
      return (state = action.payload);
    },
  },
});

export const { addAuthor, storeAuthors } = userSlice.actions;

export default userSlice.reducer;
