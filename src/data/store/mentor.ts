import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  score: 0,
};

const scoreSlice = createSlice({
  name: "score",
  initialState,
  reducers: {
    increaseScore: (state) => {
      state.score += 1;
    },
    reduceScore: (state) => {
      console.log(state);
      if (state.score > 0) {
        state.score -= 1;
      }
    },
  },
});

export const { increaseScore, reduceScore } = scoreSlice.actions;
export default scoreSlice.reducer;