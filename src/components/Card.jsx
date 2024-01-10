import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "react-lazy-load-image-component/src/effects/blur.css";

const Card = ({ record }) => {
  const genres = useSelector((state) => state.genres);
  const conf = useSelector((state) => state.conf);
  const rating = Number(record?.vote_average);

  return (
    <div className="min-w-[calc(100%/3-7px)] md:min-w-[calc(100%/4-7px)] lg:min-w-[calc(100%/5-7px)] xl:min-w-[calc(100%/6-7px)] 2xl:min-w-[calc(100%/7-7px)] w-[calc(100%/3-7px)] md:w-[calc(100%/4-7px)] lg:w-[calc(100%/5-7px)] xl:w-[calc(100%/6-7px)] 2xl:w-[calc(100%/7-7px)]">
      <Link to={`/${record.media_type || "tv"}/${record.id}`}>
        <div className="relative">
          <div className="rounded-lg overflow-hidden aspect-[2/3]">
            <LazyLoadImage
              wrapperClassName={`w-full bg-gray-900 aspect-[2/3] ${
                record?.poster_path ? "" : "animate-pulse"
              }`}
              className="rounded-lg hover:scale-110 duration-300 transition-[all!important]"
              src={`${conf?.images?.base_url}/w300/${record?.poster_path}`}
              alt=""
              placeholderSrc="/logo.svg"
              effect="blur"
            />
          </div>

          <div className="relative -translate-y-1/2 start-2 text-black font-bold bg-white rounded-full flex justify-center items-center w-1/4 h-/4 z-10">
            <svg viewBox="0 0 100 100" className="p-0.5">
              <path
                d="M 50,50 m 0,-46 a 46,46 0 1 1 0,92 a 46,46 0 1 1 0,-92"
                strokeWidth="8"
                fillOpacity="0"
                style={{
                  stroke:
                    rating === 0
                      ? "gray"
                      : rating < 4
                      ? "red"
                      : rating < 7
                      ? "orange"
                      : "green",
                  strokeDasharray: "290px",
                  strokeDashoffset: 140 - rating * 10,
                }}
              ></path>
              <text x="25" y="60" className="text-4xl">
                {!!rating && rating?.toFixed(1)}
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
            {record.title || record?.name || (
              <div className="mt-12 min-h-7 bg-gray-800 rounded-lg animate-pulse"></div>
            )}
          </span>
          <span className="text-sm text-gray-400 font-semibold">
            {record.release_date || record.first_air_date || (
              <div className="min-h-5 bg-gray-800 rounded-lg animate-pulse"></div>
            )}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default Card;
