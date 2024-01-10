import { useSelector } from "react-redux";
import useAxios from "../utlils/hooks/useAxios";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Hero = () => {
  const genres = useSelector((state) => state.genres);
  const baseUrl = useSelector((state) => state?.conf?.images?.base_url);
  const { data } = useAxios("https://api.themoviedb.org/3/movie/upcoming");

  const {
    backdrop_path: backdropPath,
    title,
    overview,
    genre_ids: genreIds,
  } = data?.results?.[parseInt(Math.random() * 20)] ?? {};

  return (
    <div className="relative h-60 lg:h-[50vh]">
      <Link to="/movies" className="relative h-auto">
        <LazyLoadImage
          className="w-full"
          src={`${baseUrl}/original/${backdropPath}`}
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
        <h1 className="text-2xl lg:text-4xl font-bold">{title}</h1>
        <span className="w-max px-2 py-1 text-sm lg:text-base bg-green-700 font-semibold rounded-md">
          New Release
        </span>
        <p className="line-clamp-2 text-ellipsis">{overview}</p>
        <div className="flex gap-1">
          {genreIds?.map(
            (genreId) =>
              genres[genreId] && (
                <div key={genreId} className="px-4 py-1 bg-gray-800 rounded-md">
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
