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

      let promises = [];
      let endPoints = ["tv", "movie"];
      let allGenres = {};

      endPoints.forEach((type) => {
        promises.push(
          fetchRecordFromApi(`${TMDB_API_BASE_URL}/genre/${type}/list`)
        );
      });

      const data = await Promise.all(promises);
      data.map(({ genres }) =>
        genres.map((genre) => (allGenres[genre?.id] = genre?.name))
      );

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
