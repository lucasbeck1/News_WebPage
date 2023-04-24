import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  users: string[];
}

const initialState: UserState[] = [];

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<UserState>) {
      state.push(action.payload);
    },
  },
});

export const { addUser } = userSlice.actions;

export default userSlice.reducer;
