import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    movieResults: null,
    movieNames: null,
  },
  reducers: {
    addGptMovieResult: (state, action) => {
      const { movieNames, movieResults } = action.payload;
      state.movieNames = movieNames;
      state.movieResults = movieResults;
    },
    clearGptResults: (state) => {
      state.movieNames = null;
      state.movieResults = null;
    },
  },
});

export const { addGptMovieResult, clearGptResults } = gptSlice.actions;
export default gptSlice.reducer;
