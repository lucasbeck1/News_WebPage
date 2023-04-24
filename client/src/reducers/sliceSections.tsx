import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Section {
  id: number;
  name: string;
  quantity: number;
}

interface SectionState {
  sections: Section[];
}

const initialState: Section[] = [];

const sectionSlice = createSlice({
  name: "sections",
  initialState,
  reducers: {
    addSection(state, action: PayloadAction<Section>) {
      state.push(action.payload);
    },
    storeSections(state, action: PayloadAction<Section[]>) {
      return (state = action.payload);
    },
  },
});

export const { addSection, storeSections } = sectionSlice.actions;

export default sectionSlice.reducer;
