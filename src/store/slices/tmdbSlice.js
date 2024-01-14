import { createSlice } from "@reduxjs/toolkit";

let tmdb = {
  genres: {
    movie: [],
    tv: [],
  },
  conf: {},
};

const tmdbSlice = createSlice({
  name: "tmdb",
  initialState: tmdb,
  reducers: {
    setTMDBConf: (state, action) => {
      state.conf = action.payload;
    },
    setGenres: (state, action) => {
      state.genres = action.payload;
    },
    setMovieGenres: (state, action) => {
      state.genres.movie = action.payload;
    },
    setTVGenres: (state, action) => {
      state.genres.tv = action.payload;
    },
  },
});

export const { setTMDBConf, setGenres, setMovieGenres, setTVGenres } =
  tmdbSlice.actions;

export default tmdbSlice.reducer;
