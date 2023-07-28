import { createSlice, PayloadAction } from "@reduxjs/toolkit";

enum UserType {
  none = "none",
  author = "author",
  admin = "admin",
  sponsor = "sponsor",
}

type UserAuth = {
  name: string;
  type: string;
};

const initialState: UserAuth = { name: "", type: "none" };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authState(state, action: PayloadAction<UserAuth>) {
      return (state = action.payload);
    },
    clearState(state) {
      return (state = initialState);
    },
  },
});

export const { authState, clearState } = authSlice.actions;

export default authSlice.reducer;
