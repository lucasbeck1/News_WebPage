import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Publicity = {
  id: number;
  image: string;
  active: boolean;
  finished: boolean;
  approved: boolean;
  payment: JSON;
  start: Date;
  finish: Date;
};

const initialState: Publicity[] = [];

const publicitySlice = createSlice({
  name: "publicities",
  initialState,
  reducers: {
    addPublicity(state, action: PayloadAction<Publicity>) {
      state.push(action.payload);
    },
    storePublicities(state, action: PayloadAction<Publicity[]>) {
      return (state = action.payload);
    },
  },
});

export const { addPublicity, storePublicities } = publicitySlice.actions;

export default publicitySlice.reducer;
