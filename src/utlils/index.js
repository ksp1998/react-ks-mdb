import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

const headers = {
  Authorization: "bearer " + import.meta.env.VITE_TMDB_API_READ_ACCESS_TOKEN,
};

export const fetchRecordFromApi = async (endpoint, params) => {
  try {
    const { data } = await axios.get(BASE_URL + endpoint, {
      headers,
      params,
    });
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
