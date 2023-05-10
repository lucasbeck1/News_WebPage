import { createSlice, PayloadAction } from "@reduxjs/toolkit";

enum User {
  none = "none",
  author = "author",
  admin = "admin",
}

const initialState: string = "none";

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authState(state, action: PayloadAction<string>) {
      return (state = action.payload);
    },
  },
});

export const { authState } = authSlice.actions;

export default authSlice.reducer;
