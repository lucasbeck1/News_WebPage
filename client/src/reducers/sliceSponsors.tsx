import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Sponsor = {
  id: string;
  name: string;
  mail: string;
  password?: string;
};

const initialState: Sponsor[] = [];

const SponsorSlice = createSlice({
  name: "sponsors",
  initialState,
  reducers: {
    addSponsor(state, action: PayloadAction<Sponsor>) {
      state.push(action.payload);
    },
    storeSponsors(state, action: PayloadAction<Sponsor[]>) {
      return (state = action.payload);
    },
  },
});

export const { addSponsor, storeSponsors } = SponsorSlice.actions;

export default SponsorSlice.reducer;
