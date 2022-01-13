import React from "react";
import { css } from "glamor";
import { loadAllSongs } from "./Api";
import Clock from "./clock";
import yearText from "./yearText";

const style = {
  page: css({
    textAlign: "center",
    color: "white",
    width: "100vw",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100vh",
  }),
  audioPlayer: css({
    width: "100%",
    display: "none",
  }),
  skipButton: css({
    background: "#711D8C",
    border: "none",
    color: "white",
    cursor: "pointer",
    fontSize: "2rem",
    outline: "none",
    padding: "2rem",
  }),
  yearTextContainer: css({
    fontSize: "5vh",
    width: "50%",
    margin: "auto",
    fontWeight: "bold",
  }),
  yearTextExcerpt: css({
    fontSize: "1.4em",
    lineHeight: 1.4,
  }),
};

const App = () => {
  const [isFetching, setIsFetching] = React.useState(false);
  const [songs, setSongs] = React.useState([]);
  const [song, setSong] = React.useState(null);

  const chooseRandomSong = (_songs) => {
    const list = Array.isArray(_songs) ? _songs : songs;
    if (!list || !list.length) {
      return reloadSongManifest();
    }
    const selectedSong = ~~(Math.random() * list.length);
    setSong(list[selectedSong]);
    setSongs(list.filter((ignore, i) => i !== selectedSong));
  };

  const reloadSongManifest = () => {
    if (!isFetching) {
      setIsFetching(true);
      loadAllSongs().then((files) => {
        chooseRandomSong(files);
        setIsFetching(false);
      });
    }
  };

  if (!song && !songs.length) {
    reloadSongManifest();
    return null;
  }

  // TODO: fix hack
  // couldn't use a ref because it's ready after first song
  // and can't use volume attribute for some reason, it's ignored
  // on chrome at least
  const onStart = (e) => {
    e.target.volume = 0.06;
  };

  return (
    <div {...style.page}>
      <div {...style.yearTextContainer}>
        <p {...style.yearTextExcerpt}>"{yearText.excerpt}"</p>
        <p>—{yearText.ref}.</p>
      </div>
      <Clock />
      <audio key={song.url} autoPlay controls onEnded={chooseRandomSong} onLoadStart={onStart} {...style.audioPlayer}>
        <source src={song.url} type="audio/mpeg" />
      </audio>
    </div>
  );
};

export default App;
