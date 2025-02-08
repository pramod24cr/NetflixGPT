import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    trailerVideo: null,
    nowPlayingMovies: null,
    trendingMovies: null,
    topRatedMovies: null,
    upcomingMovies: null,
    popularMovies: null,
    selectedMovie: null,
    watchlist: [],
  },
  reducers: {
    addTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addTrendingMovies: (state, action) => {
      state.trendingMovies = action.payload;
    },
    addTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
    addUpcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addSelectedMovie: (state, action) => {
      state.selectedMovie = action.payload;
    },
    addToWatchlist: (state, action) => {
      const movie = action.payload;
      if (!state.watchlist.some((m) => m.id === movie.id)) {
        state.watchlist.push(movie);
      }
    },
    removeFromWatchlist: (state, action) => {
      state.watchlist = state.watchlist.filter((m) => m.id !== action.payload);
    },
  },
});

export const { 
  addTrailerVideo, 
  addNowPlayingMovies, 
  addTrendingMovies, 
  addTopRatedMovies, 
  addUpcomingMovies, 
  addPopularMovies, 
  addSelectedMovie,
  addToWatchlist,
  removeFromWatchlist
} = moviesSlice.actions;

export default moviesSlice.reducer;
