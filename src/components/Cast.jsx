import { useSelector } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Cast = ({ cast, error, className }) => {
  const conf = useSelector((state) => state.conf);

  return (
    <div className="relative p-2">
      <h3 className="text-xl font-bold py-2">Top Cast</h3>
      <div className={`flex gap-8 overflow-auto no-scrollbar ${className}`}>
        {(cast || Array(10).fill(null))?.map((member, i) => (
          <div
            key={member?.id || i}
            className="cursor-pointer min-w-[calc(100%/3-32px)] sm:min-w-[calc(100%/4-32px)] md:min-w-[calc(100%/5-32px)] lg:min-w-[calc(100%/6-32px)] xl:min-w-[calc(100%/7-32px)] 2xl:min-w-[calc(100%/8-32px)] w-[calc(100%/3-32px)] sm:w-[calc(100%/4-32px)] md:w-[calc(100%/5-32px)] lg:w-[calc(100%/6-32px)] xl:w-[calc(100%/7-32px)] 2xl:w-[calc(100%/8-32px)]"
          >
            <div className="rounded-full overflow-hidden aspect-square">
              <LazyLoadImage
                wrapperClassName={`w-full bg-gray-900 aspect-square ${
                  member ? "" : "animate-pulse"
                }`}
                className="object-cover hover:scale-110 duration-300 transition-[all!important]"
                alt={member?.name}
                effect="blur"
                src={
                  member?.profile_path
                    ? `${conf?.images?.base_url}/w300/${member?.profile_path}`
                    : "/no-avatar.png"
                }
              />
            </div>
            <div className="flex flex-col gap-1.5 py-2 text-center">
              <div className="text-sm md:text-lg font-bold">
                {member?.name}
                {!member && (
                  <div className="min-h-5 bg-gray-900 rounded-lg animate-pulse"></div>
                )}
              </div>
              <div className="text-sm md:text-base text-gray-50">
                {member?.character}
                {!member && (
                  <div className="mx-5 min-h-5 bg-gray-900 rounded-lg animate-pulse"></div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-red-500">{error}</div>
    </div>
  );
};

export default Cast;
