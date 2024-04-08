import { useSelector } from "react-redux";
import { TMDB_API_BASE_URL } from "../utlils";
import { useAxios } from "../utlils/hooks";
import { LazyLoadImage } from "react-lazy-load-image-component";

const socialLinks = [
  {
    key: "imdb_id",
    baseUrl: "https://imdb.com/name",
    icon: "/ic-imdb.svg",
  },
  {
    key: "twitter_id",
    baseUrl: "https://twitter.com",
    icon: "/ic-twitter.svg",
  },
  {
    key: "instagram_id",
    baseUrl: "https://instagram.com",
    icon: "/ic-instagram.svg",
  },
  {
    key: "facebook_id",
    baseUrl: "https://facebook.com",
    icon: "/ic-facebook.svg",
  },
  {
    key: "youtube_id",
    baseUrl: "https://youtube.com",
    icon: "/ic-youtube.svg",
  },
];

const PersonDetails = ({ id }) => {
  const { data: person, loading } = useAxios(
    `${TMDB_API_BASE_URL}/person/${id}`
  );

  const { data: externalIds } = useAxios(
    `${TMDB_API_BASE_URL}/person/${id}/external_ids`
  );

  const conf = useSelector((state) => state.tmdb.conf);

  document.title = `KS MDB | ${person?.name || "Person"}`;

  return (
    <>
      <div
        className="absolute top-0 bottom-0 w-full lg:w-[calc(100%-6rem)]"
        style={{
          background: `url(${conf?.images?.base_url}/original/${person?.profile_path}) no-repeat top / cover`,
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
          <div className="m-auto md:m-0 aspect-[2/3] min-w-[min(100%,300px)] md:min-w-[300px] lg:w-[350px] max-w-[350px] mb-8">
            <LazyLoadImage
              wrapperClassName={`w-full bg-gray-900 aspect-[2/3] rounded-lg overflow-hidden ${
                loading ? "animate-pulse" : ""
              }`}
              className="w-full rounded-lg hover:scale-110 duration-300 transition-[all!important]"
              src={
                person?.profile_path
                  ? `${conf?.images?.base_url}/w780/${person?.profile_path}`
                  : !loading
                  ? "/no-poster.png"
                  : "false"
              }
              alt=""
              effect="blur"
            />

            <ul className="mt-2 flex gap-2 items-center">
              {socialLinks.map(({ key, baseUrl, icon }, index) => {
                const url = `${baseUrl}/${externalIds[key]}`;
                return (
                  (loading || externalIds[key]) && (
                    <li key={index}>
                      {loading && (
                        <div className="min-h-12 aspect-square bg-gray-900 rounded-lg animate-pulse"></div>
                      )}
                      {!loading && (
                        <a href={url} target="_blank" rel="noreferrer">
                          <img src={icon} alt={url} />
                        </a>
                      )}
                    </li>
                  )
                );
              })}
            </ul>
          </div>

          <div className="flex-grow flex flex-col gap-4 z-10">
            <div className="text-4xl lg:text-6xl font-extrabold">
              {!loading && person?.name}
              {loading && (
                <div className="min-h-14 w-1/2 bg-gray-800 rounded-lg animate-pulse"></div>
              )}
            </div>

            {/* Biography */}
            <div className="flex flex-col gap-2">
              {person?.biography && (
                <>
                  <div className="text-2xl font-bold py-2">Biography</div>
                  <div className="text-base font-semibold max-h-36 hover:max-h-full overflow-hidden transition-all ease-in-out duration-300">
                    {person?.biography}
                  </div>
                </>
              )}
              {loading && (
                <div className="min-h-32 bg-gray-800 rounded-lg animate-pulse"></div>
              )}
            </div>

            <div className="flex gap-2.5 flex-col">
              {/* Known For */}
              {person?.known_for_department && (
                <div className="flex gap-3 py-2.5 border-y-2 border-gray-800 font-bold">
                  <span className="">Known For: </span>
                  <span className="text-gray-300">
                    {person?.known_for_department}
                  </span>
                </div>
              )}

              {/* Known Credits */}
              {person?.popularity && (
                <div className="flex gap-3 pb-2.5 border-b-2 border-gray-800 font-bold">
                  <span className="">Known Credits: </span>
                  <span className="text-gray-300">{person?.popularity}</span>
                </div>
              )}

              {/* Homepage */}
              {person?.homepage && (
                <div className="flex gap-3 pb-2.5 border-b-2 border-gray-800 font-bold">
                  <span className="">Homepage: </span>
                  <a href={person?.homepage} target="blank">
                    {person?.homepage}
                  </a>
                </div>
              )}

              {/* Gender */}
              {person?.gender && (
                <div className="flex gap-3 pb-2.5 border-b-2 border-gray-800 font-bold">
                  <span className="">Gender: </span>
                  <span className="text-gray-300">
                    {person?.gender === 1
                      ? "Female"
                      : person?.gender === 2
                      ? "Male"
                      : ""}
                  </span>
                </div>
              )}

              <div className="flex flex-col lg:flex-row gap-3 pb-2.5 border-b-2 border-gray-800">
                {/* Birthday */}
                {person?.birthday && (
                  <div className="flex gap-3 font-bold">
                    <span className="">Birthday: </span>
                    <span className="text-gray-300">{person?.birthday}</span>
                  </div>
                )}

                {/* Deathday */}
                {person?.deathday && (
                  <div className="flex gap-3 font-bold">
                    <span className="">Deathday: </span>
                    <span className="text-gray-300">{person?.deathday}</span>
                  </div>
                )}

                {/* Place of Birth */}
                {person?.place_of_birth && (
                  <div className="flex gap-3 font-bold">
                    <span className="">Place of Birth: </span>
                    <span className="text-gray-300">
                      {person?.place_of_birth}
                    </span>
                  </div>
                )}
              </div>

              {/* Also Known As */}
              <div className="flex flex-col gap-2">
                {person?.also_known_as && (
                  <div className="text-md font-bold">Also Known As</div>
                )}

                {loading && (
                  <div className="min-h-8 bg-gray-800 rounded-lg animate-pulse"></div>
                )}

                <div className="flex flex-wrap gap-1">
                  {person?.also_known_as?.map(
                    (knownAs, index) =>
                      knownAs && (
                        <div
                          key={index}
                          className="px-2 py-1 bg-green-700 text-sm rounded-md"
                        >
                          {knownAs}
                        </div>
                      )
                  )}
                  {loading && (
                    <>
                      <div className="min-h-8 w-32 bg-gray-800 rounded-lg animate-pulse"></div>
                      <div className="min-h-8 w-32 bg-gray-800 rounded-lg animate-pulse"></div>
                    </>
                  )}
                </div>
              </div>

              {loading && (
                <>
                  <div className="min-h-6 w-3/4 lg:1/2 flex-grow bg-gray-800 rounded-lg animate-pulse"></div>
                  <div className="min-h-6 w-3/4 lg:1/2 flex-grow bg-gray-800 rounded-lg animate-pulse"></div>
                  <div className="min-h-6 w-3/4 lg:1/2 flex-grow bg-gray-800 rounded-lg animate-pulse"></div>
                </>
              )}
            </div>

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

export default PersonDetails;
