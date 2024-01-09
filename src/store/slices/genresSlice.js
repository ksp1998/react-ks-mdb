import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let genres = {};
try {
  const response = await axios.get(
    "https://api.themoviedb.org/3/genre/movie/list",
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${
          import.meta.env.VITE_TMDB_API_READ_ACCESS_TOKEN
        }`,
      },
    }
  );
  genres = response.data?.genres?.reduce((genres, genre) => {
    genres[genre.id] = genre.name;
    return genres;
  });
} catch {
  genres = {};
}

const genresSlice = createSlice({
  name: "genres",
  initialState: genres,
  reducers: {},
});

export default genresSlice.reducer;
