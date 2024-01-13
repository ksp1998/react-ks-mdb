import { useContext } from "react";
import PlayerContext from "../context/PlayerContext";

const usePlayer = () => {
  const { videoId, setVideoId, showPlayer, setShowPlayer } =
    useContext(PlayerContext);

  return { videoId, setVideoId, showPlayer, setShowPlayer };
};

export default usePlayer;
