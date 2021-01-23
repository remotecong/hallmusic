import React from "react";
import { css } from "glamor";
import { loadAllSongs } from "./Api";
import Clock from "./clock";

const style = {
  page: css({
    textAlign: "center",
    width: "90vw",
    margin: "auto"
  }),
  audioPlayer: css({
    width: "100%",
    display: "none"
  }),
  skipButton: css({
    background: "#711D8C",
    border: "none",
    color: "white",
    cursor: "pointer",
    fontSize: "2rem",
    outline: "none",
    padding: "2rem"
  })
};

const App = () => {
  const [songs, setSongs] = React.useState([]);
  const [song, setSong] = React.useState(null);

  const chooseRandomSong = _songs => {
    const list = (Array.isArray(_songs) && _songs) || songs;
    if (!list || !list.length) {
      return reloadSongManifest();
    }
    const selectedSong = ~~(Math.random() * list.length);
    setSong(list[selectedSong]);
    setSongs(list.filter((ignore, i) => i !== selectedSong));
  };
  const reloadSongManifest = () => {
    loadAllSongs().then(files => {
      chooseRandomSong(files);
    });
  };

  React.useEffect(() => {
    reloadSongManifest();
  }, []);

  if (!song) {
    return null;
  }

  // TODO: fix hack
  // couldn't use a ref because it's ready after first song
  // and can't use volume attribute for some reason, it's ignored
  // on chrome at least
  const onStart = e => {
    e.target.volume = 0.06;
  };

  return (
    <div {...style.page}>
      <Clock />
      <audio
        key={song.url}
        autoPlay
        controls
        onEnded={chooseRandomSong}
        onLoadStart={onStart}
        {...style.audioPlayer}
      >
        <source src={song.url} type="audio/mpeg" />
      </audio>
    </div>
  );
};

export default App;
