import { createContext, useState } from "react";
import { Player } from "../../components";

const PlayerContext = createContext();

const PlayerProvider = ({ children }) => {
  const [showPlayer, setShowPlayer] = useState(false);
  const [videoId, setVideoId] = useState(null);

  return (
    <PlayerContext.Provider
      value={{ showPlayer, setShowPlayer, videoId, setVideoId }}
    >
      <Player
        videoId={videoId}
        setVideoId={setVideoId}
        showPlayer={showPlayer}
        setShowPlayer={setShowPlayer}
      />

      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContext;
export { PlayerProvider };
