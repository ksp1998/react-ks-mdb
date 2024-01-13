import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import PlayIcon from "./PlayIcon";

const VideoCard = ({ video }) => {
  return (
    <div
      className="group min-w-[calc(100%/1.75-16px)] md:min-w-[calc(100%/2.5-16px)] lg:min-w-[calc(100%/3-16px)] xl:min-w-[calc(100%/4-16px)] 2xl:min-w-[calc(100%/5-16px)] w-[calc(100%/3-16px)] md:w-[calc(100%/5-16px)] lg:w-[calc(100%/6-16px)] xl:w-[calc(100%/7-16px)] 2xl:w-[calc(100%/8-16px)]"
      style={{ cursor: !video ? "not-allowed" : "pointer" }}
      onClick={() => alert("Play Video")}
    >
      <div className="relative">
        <div
          className={`rounded-lg overflow-hidden aspect-[16/9] bg-gray-900 group-hover:opacity-60 duration-300 ${
            video ? "" : "animate-pulse"
          }`}
        >
          {video?.key && (
            <LazyLoadImage
              wrapperClassName="w-full aspect-[16/9]"
              className="rounded-lg hover:scale-110 duration-300 transition-[all!important] w-full h-full object-cover"
              src={`https://img.youtube.com/vi/${video?.key}/mqdefault.jpg`}
              alt={video?.name}
              effect="blur"
            />
          )}

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:text-green-500 group-hover:scale-95 duration-300 cursor-pointer z-10">
            <PlayIcon />
          </div>
        </div>
      </div>

      <div className="mt-2 flex flex-col gap-2">
        <span className="text-lg font-bold">
          {video?.name}
          {!video && (
            <div className="min-h-7 bg-gray-900 rounded-lg animate-pulse"></div>
          )}
        </span>
      </div>
    </div>
  );
};

export default VideoCard;
