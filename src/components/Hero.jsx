import { useSelector } from "react-redux";
import useAxios from "../utlils/hooks/useAxios";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useEffect, useState } from "react";
import { TMDB_API_BASE_URL } from "../utlils";

const Hero = () => {
  const genres = useSelector((state) => state.tmdb.genres);
  const baseUrl = useSelector((state) => state.tmdb.conf?.images?.base_url);
  const { data } = useAxios(`${TMDB_API_BASE_URL}/movie/upcoming`);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    setMovie(data?.results?.[parseInt(Math.random() * 20)] ?? {});
  }, [data?.results]);

  useEffect(() => {
    const timer = setInterval(() => {
      setMovie(data?.results?.[parseInt(Math.random() * 20)] ?? {});
    }, 10000);
    return () => clearInterval(timer);
  }, [data?.results, movie]);

  return (
    <div className="relative h-60 lg:h-[50vh]">
      <Link to={`/movie/${movie?.id}`} className="relative h-auto">
        <LazyLoadImage
          className="w-full duration-300"
          src={`${baseUrl}/original/${movie?.backdrop_path}`}
          alt=""
        />
        <div
          className="absolute top-0 h-full w-full"
          style={{
            background: "linear-gradient(#02061700, #020617CC 50%, #020617)",
          }}
        ></div>
      </Link>
      <div className="absolute bottom-0 p-4 flex flex-col gap-3 w-[min(100%,500px)]">
        <h1 className="text-2xl lg:text-4xl font-bold">{movie?.title}</h1>
        <div className="flex items-center gap-2">
          <span className="w-max px-2 py-1 text-sm lg:text-base bg-green-700 font-semibold rounded-md">
            New Release
          </span>
          {movie?.adult && (
            <span className="w-max px-2 py-1 bg-gray-900 font-semibold rounded-md">
              18+
            </span>
          )}
        </div>
        <p className="line-clamp-2 text-ellipsis">{movie?.overview}</p>
        <div className="flex gap-1">
          {movie?.genre_ids?.map(
            (genreId) =>
              genres[genreId] && (
                <div key={genreId} className="px-4 py-1 bg-gray-900 rounded-md">
                  {genres[genreId]}
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
