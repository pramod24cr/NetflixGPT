import { createSlice } from "@reduxjs/toolkit";

// Load watchlist from localStorage if available
const storedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

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
    watchlist: storedWatchlist,
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
        localStorage.setItem("watchlist", JSON.stringify(state.watchlist));
      }
    },
    removeFromWatchlist: (state, action) => {
      state.watchlist = state.watchlist.filter((m) => m.id !== action.payload);
      localStorage.setItem("watchlist", JSON.stringify(state.watchlist));
    },
    setWatchlist: (state, action) => {
      state.watchlist = action.payload;
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
  removeFromWatchlist,
  setWatchlist
} = moviesSlice.actions;

export default moviesSlice.reducer;
