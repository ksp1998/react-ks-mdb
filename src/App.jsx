import { Outlet } from "react-router-dom";
import { Header } from "./components";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { TMDB_API_BASE_URL, fetchRecordFromApi } from "./utlils";
import { setGenres, setTMDBConf } from "./store/slices/tmdbSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      fetchRecordFromApi(`${TMDB_API_BASE_URL}/configuration`)
        .then((response) => dispatch(setTMDBConf(response)))
        .catch((error) => console.log(error));

      let allGenres = {};

      let response = await fetchRecordFromApi(
        `${TMDB_API_BASE_URL}/genre/movie/list`
      );
      response?.genres?.map((genre) => (allGenres[genre?.id] = genre?.name));
      allGenres.movie = response?.genres;

      response = await fetchRecordFromApi(`${TMDB_API_BASE_URL}/genre/tv/list`);
      response?.genres?.map((genre) => (allGenres[genre?.id] = genre?.name));
      allGenres.tv = response?.genres;

      dispatch(setGenres(allGenres));
    })();
  }, [dispatch]);

  return (
    <>
      <Header />
      <main className="lg:ml-24">
        <Outlet />
      </main>
    </>
  );
};

export default App;
