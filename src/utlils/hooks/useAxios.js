import axios from "axios";
import { useEffect, useState } from "react";

const useAxios = (endpoint) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const options = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${
          import.meta.env.VITE_TMDB_API_READ_ACCESS_TOKEN
        }`,
      },
    };

    axios
      .get(endpoint, options)
      .then((response) => {
        const data = response?.data;
        if (data) {
          setData(data);
        } else {
          setError("Invalid result fetched!");
          console.log("Response: ", response);
        }
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [endpoint]);

  return { data, error, loading };
};

export default useAxios;
