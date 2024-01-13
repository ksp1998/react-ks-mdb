import { useSelector } from "react-redux";
import useAxios from "../utlils/hooks/useAxios";
import { BASE_URL } from "../utlils";
import { useParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { PlayIcon, RatingProgress } from "./";

const toHoursAndMinutes = (totalMinutes) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
};

const DetailsHero = ({ mediaType, crew }) => {
  const { id } = useParams();

  const { data: media, loading } = useAxios(`${BASE_URL}/${mediaType}/${id}`);
  const conf = useSelector((state) => state.conf);

  const directors = crew?.filter((cr) => cr.job === "Director");
  const writers = crew?.filter((cr) =>
    ["Screenplay", "Story", "Writer"].includes(cr?.job)
  );

  return (
    <>
      <div
        className="absolute top-0 bottom-0 w-full lg:w-[calc(100%-6rem)]"
        style={{
          background: `url(${conf?.images?.base_url}/original/${media?.backdrop_path}) no-repeat top / cover`,
          backdropFilter: "opacity(.5)",
        }}
      >
        <div
          className="absolute top-0 h-full w-full"
          style={{
            background: "linear-gradient(#02061799, #020617)",
          }}
        ></div>
      </div>
      <div className="relative py-8">
        <div className="max-w-7xl m-auto flex flex-col gap-8 p-4 md:flex-row">
          <div className="m-auto md:m-0 rounded-lg overflow-hidden aspect-[2/3] min-w-[min(100%,300px)] md:min-w-[300px] lg:w-[350px] max-w-[350px]">
            <LazyLoadImage
              wrapperClassName={`w-full bg-gray-900 aspect-[2/3] ${
                loading ? "animate-pulse" : ""
              }`}
              className="w-full rounded-lg hover:scale-110 duration-300 transition-[all!important]"
              src={
                media?.poster_path
                  ? `${conf?.images?.base_url}/w780/${media?.poster_path}`
                  : !loading
                  ? "/no-poster.png"
                  : "false"
              }
              alt=""
              effect="blur"
            />
          </div>

          <div className="flex-grow flex flex-col gap-4 z-10">
            <div className="text-4xl lg:text-6xl font-extrabold">
              {!loading &&
                `${media?.name || media?.title} (${new Date(
                  media?.release_date || media.first_air_date
                ).getFullYear()})`}
              {loading && (
                <div className="min-h-12 bg-gray-800 rounded-lg animate-pulse"></div>
              )}
            </div>
            <div className="text-gray-300 text-2xl italic font-bold">
              {media?.tagline}
              {loading && (
                <div className="min-h-6 max-w-full w-1/2 bg-gray-800 rounded-lg animate-pulse"></div>
              )}
            </div>

            <div className="flex gap-1">
              {media?.genres?.map(
                (genre, index) =>
                  genre?.name && (
                    <div
                      key={genre?.id ?? index}
                      className="px-2 py-1 bg-green-700 text-sm rounded-md"
                    >
                      {genre?.name}
                    </div>
                  )
              )}
              {loading && (
                <>
                  <div className="min-h-6 w-24 bg-gray-800 rounded-lg animate-pulse"></div>
                  <div className="min-h-6 w-24 bg-gray-800 rounded-lg animate-pulse"></div>
                </>
              )}
            </div>

            <div className="flex items-center gap-5">
              <div className="h-24">
                <RatingProgress
                  rating={media?.vote_average}
                  textColor="white"
                  className={`bg-gray-950 p-1.5 ${
                    loading ? "animate-pulse" : ""
                  }`}
                />
              </div>

              <div
                className="flex items-center gap-4 hover:text-green-500 hover:scale-95 duration-300 cursor-pointer"
                onClick={() => alert("Play Trailer")}
              >
                <PlayIcon />
                <span className="text-lg">Watch Trailer</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {media?.overview && (
                <>
                  <div className="text-2xl font-bold">Overview</div>
                  <div className="text-base font-semibold">
                    {media?.overview}
                  </div>
                </>
              )}
              {loading && (
                <div className="min-h-24 bg-gray-800 rounded-lg animate-pulse"></div>
              )}
            </div>

            <div className="flex flex-col lg:flex-row gap-3 pb-4 border-b-2 border-gray-800">
              {media?.status && (
                <div className="font-bold">
                  <span className="">Status: </span>
                  <span className="text-gray-300">{media?.status}</span>
                </div>
              )}
              {(media?.release_date || media?.first_air_date) && (
                <div className="font-bold">
                  <span className="text bold">Release Date: </span>
                  <span className="text-gray-300">
                    {media?.release_date || media?.first_air_date}
                  </span>
                </div>
              )}
              {media?.runtime && (
                <div className="font-bold">
                  <span className="text bold">Runtime: </span>
                  <span className="text-gray-300">
                    {toHoursAndMinutes(media?.runtime)}
                  </span>
                </div>
              )}
            </div>

            {!!directors?.length && (
              <div className="flex gap-3 pb-4 border-b-2 border-gray-800 font-bold">
                <span className="">Director: </span>
                <span className="text-gray-300">
                  {directors.map((director) => director.name).join(", ")}
                </span>
              </div>
            )}

            {!!writers?.length && (
              <div className="flex gap-3 pb-4 border-b-2 border-gray-800 font-bold">
                <span className="">Writer: </span>
                <span className="text-gray-300">
                  {writers.map((writer) => writer.name).join(", ")}
                </span>
              </div>
            )}

            {!!media?.created_by?.length && (
              <div className="flex gap-3 pb-4 border-b-2 border-gray-800 font-bold">
                <span className="">Creator: </span>
                <span className="text-gray-300">
                  {media?.created_by?.map((creator) => creator.name).join(", ")}
                </span>
              </div>
            )}

            {loading && (
              <>
                <div className="min-h-8 flex-grow bg-gray-800 rounded-lg animate-pulse"></div>
                <div className="min-h-8 flex-grow bg-gray-800 rounded-lg animate-pulse"></div>
                <div className="min-h-8 flex-grow bg-gray-800 rounded-lg animate-pulse"></div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsHero;
