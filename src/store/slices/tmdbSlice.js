import { createSlice } from "@reduxjs/toolkit";

let tmdb = {
  genres: {},
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
  },
});

export const { setTMDBConf, setGenres } = tmdbSlice.actions;

export default tmdbSlice.reducer;
