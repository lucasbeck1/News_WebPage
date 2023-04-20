import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Section {
  id: number;
  name: string;
  quantity: number;
}

interface SectionState {
  sections: Section[];
}

const initialState: SectionState = {
  sections: [],
};

const sectionSlice = createSlice({
  name: "section",
  initialState,
  reducers: {
    addSection(state, action: PayloadAction<Section>) {
      state.sections.push(action.payload);
    },
    storeSections(state, action: PayloadAction<Section[]>) {
      state.sections = action.payload;
    },
  },
});

export const { addSection, storeSections } = sectionSlice.actions;

export default sectionSlice.reducer;
