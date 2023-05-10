import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserAuth {
  name: string;
  type: string;
}

enum UserType {
  none = "none",
  author = "author",
  admin = "admin",
}

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
