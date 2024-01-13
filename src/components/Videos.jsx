import { VideoCard } from "./";

const Videos = ({ videos, error, className = "" }) => {
  return (
    <div className="relative p-2">
      <h3 className="text-xl font-bold py-2">Trailers & More</h3>
      <div className={`flex gap-4 overflow-auto no-scrollbar ${className}`}>
        {(videos || Array(5).fill(null))?.map((video, index) => (
          <VideoCard key={video?.key || index} video={video} />
        ))}
        <div className="text-red-500">{error}</div>
      </div>
    </div>
  );
};

export default Videos;
