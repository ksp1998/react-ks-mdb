import ReactPlayer from "react-player";

const Player = ({ videoId, setVideoId, showPlayer, setShowPlayer }) => {
  const hidePlayer = () => {
    setShowPlayer(false);
    setVideoId(null);
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex justify-center items-center z-[99] scale-0 ${
        showPlayer ? "scale-100" : ""
      } duration-300`}
    >
      <div
        className="absolute top-0 left-0 w-full h-full backdrop-blur-sm bg-gray-950 bg-opacity-25 duration-300"
        onClick={hidePlayer}
      ></div>
      <div className="p-2 w-[min(100%,800px)] aspect-video z-10">
        <span
          className="w-8 pb-2 float-right cursor-pointer"
          onClick={hidePlayer}
        >
          <img src="/ic-close.svg" alt="Close" />
        </span>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${videoId}`}
          controls
          width="min(100%,800px)"
          height="100%"
          playing={showPlayer}
        />
      </div>
    </div>
  );
};

export default Player;
