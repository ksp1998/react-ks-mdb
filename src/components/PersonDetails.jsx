import { useSelector } from "react-redux";
import { TMDB_API_BASE_URL } from "../utlils";
import { useAxios } from "../utlils/hooks";
import { LazyLoadImage } from "react-lazy-load-image-component";

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
          <div className="flex flex-col gap-4">
            <div className="m-auto md:m-0 rounded-lg overflow-hidden aspect-[2/3] min-w-[min(100%,300px)] md:min-w-[300px] lg:w-[350px] max-w-[350px]">
              <LazyLoadImage
                wrapperClassName={`w-full bg-gray-900 aspect-[2/3] ${
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
            </div>

            <div className="flex flex-col gap-2">
              <ul className="flex gap-2 items-center">
                {[
                    { key: "imdb", baseUrl: "https://imdb.com/name" },
                    { key: "twitter", baseUrl: "https://twitter.com" },
                    { key: "instagram", baseUrl: "https://instagram.com" },
                    { key: "facebook", baseUrl: "https://facebook.com" },
                    { key: "youtube", baseUrl: "https://youtube.com" },
                ].map(
                  ({ key, baseUrl }, index) =>
                    externalIds[`${key}_id`] && (
                      <li key={index}>
                        <a
                          href={`${baseUrl}/${externalIds[`${key}_id`]}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <img src={`/ic-${key}.svg`} alt={key} />
                        </a>
                      </li>
                    )
                )}
              </ul>

              <h3 className="font-bold text-2xl">
                <bdi>Personal Info</bdi>
              </h3>

              <div className="flex flex-col gap-1">
                {/* Known For */}
                <div>
                  <p>
                    <strong>
                      <bdi>Known For</bdi>
                    </strong>
                  </p>
                  <span>{person?.known_for_department}</span>
                </div>

                {/* Known Credits */}
                <div>
                  <p>
                    <strong>
                      <bdi>Known Credits</bdi>
                    </strong>
                  </p>
                  <span>{person?.popularity}</span>
                </div>

                {/* Gender */}
                <div>
                  <p>
                    <strong>
                      <bdi>Gender</bdi>
                    </strong>
                  </p>
                  <span>{person?.popularity}</span>
                </div>

                {person?.gender && (
                  <p>
                    <strong>
                      <bdi>Gender</bdi>
                    </strong>
                    {person.gender === 1
                      ? "Female"
                      : person.gender === 2
                      ? "Male"
                      : ""}
                  </p>
                )}

                {/* Birthday */}
                <div>
                  <p>
                    <strong>
                      <bdi>Birthday</bdi>
                    </strong>
                  </p>
                  <span>{person?.birthday}</span>
                </div>

                {/* Place of Birth */}
                <div>
                  <p className="full">
                    <strong>
                      <bdi>Place of Birth</bdi>
                    </strong>
                  </p>
                  <span>{person?.place_of_birth}</span>
                </div>

                {/* Also Knwon As */}
                <div>
                  <p className="full">
                    <strong>
                      <bdi>Also Known As</bdi>
                    </strong>
                  </p>
                  <ul className="flex gap-2 flex-wrap">
                    {person?.also_known_as?.map(
                      (knownAs, index) =>
                        knownAs && (
                          <li
                            key={index}
                            className="px-2 py-1 bg-green-700 text-sm rounded-md"
                          >
                            {knownAs}
                          </li>
                        )
                    )}
                    {loading && (
                      <>
                        <li className="min-h-6 w-24 bg-gray-800 rounded-lg animate-pulse"></li>
                        <li className="min-h-6 w-24 bg-gray-800 rounded-lg animate-pulse"></li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-grow flex flex-col gap-4 z-10">
            <div className="text-4xl lg:text-6xl font-extrabold">
              {!loading && person?.name}
              {loading && (
                <div className="min-h-12 bg-gray-800 rounded-lg animate-pulse"></div>
              )}
            </div>
            <div>
              {!loading && person?.biography && (
                <>
                  <h3 className="text-gray-300 text-2xl italic font-bold mb-4">
                    Biography
                  </h3>
                  <p>{person?.biography}</p>
                </>
              )}

              {loading && (
                <div className="min-h-40 bg-gray-800 rounded-lg animate-pulse"></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonDetails;
