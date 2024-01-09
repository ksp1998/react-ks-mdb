import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Card = ({ record }) => {
  const genres = useSelector((state) => state.genres);
  const conf = useSelector((state) => state.conf);

  return (
    <div className="min-w-[calc(100%/3-7px)] md:min-w-[calc(100%/4-7px)] lg:min-w-[calc(100%/5-7px)] xl:min-w-[calc(100%/6-7px)] 2xl:min-w-[calc(100%/7-7px)] w-[calc(100%/3-7px)] md:w-[calc(100%/4-7px)] lg:w-[calc(100%/5-7px)] xl:w-[calc(100%/6-7px)] 2xl:w-[calc(100%/7-7px)]">
      <Link to={`/${record.media_type || "tv"}/${record.id}`}>
        <div className="relative">
          <div className="rounded-lg overflow-hidden">
            <img
              className="rounded-lg hover:scale-110 duration-300"
              src={`${conf?.images?.base_url}/w300/${record.poster_path}`}
              alt=""
            />
          </div>
          <div className="relative -translate-y-1/2 start-2 text-black font-bold bg-white rounded-full flex justify-center items-center w-1/4 h-/4 z-10">
            <svg viewBox="0 0 100 100" className="p-0.5">
              <path
                d="M 50,50 m 0,-46 a 46,46 0 1 1 0,92 a 46,46 0 1 1 0,-92"
                strokeWidth="8"
                fillOpacity="0"
                style={{
                  stroke: "green",
                  strokeDasharray: "289.027px, 289.027px",
                  strokeDashoffset: "80.9274px",
                }}
              ></path>
              <text x="25" y="60" className="text-4xl">
                {record.vote_average.toFixed(1)}
              </text>
            </svg>
          </div>
          <div className="hidden absolute bottom-8 end-1 md:flex items-end gap-1">
            {record.genre_ids?.map(
              (genreId, i) =>
                i < 2 &&
                genres[genreId] && (
                  <div
                    key={genreId}
                    className="px-2 py-0.5 text-sm bg-gray-800 rounded-md"
                  >
                    {genres[genreId]}
                  </div>
                )
            )}
          </div>
        </div>
        <div className="-translate-y-2 flex flex-col gap-2">
          <span className="text-lg font-bold line-clamp-1 text-ellipsis">
            {record.title || record?.name}
          </span>
          <span className="text-sm text-gray-400 font-semibold">
            {record.release_date || record.first_air_date}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default Card;
