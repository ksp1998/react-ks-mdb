import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let tmdb = {};
try {
  const response = await axios.get(
    "https://api.themoviedb.org/3/configuration",
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${
          import.meta.env.VITE_TMDB_API_READ_ACCESS_TOKEN
        }`,
      },
    }
  );
  tmdb = response.data;
} catch {
  tmdb = {};
}

const confSlice = createSlice({
  name: "conf",
  initialState: tmdb,
  reducers: {},
});

export default confSlice.reducer;
