import { useEffect, useState } from "react";

import axios from "axios";
import "./App.css";
import ReactPlayer from "react-player";
import Logo from "./assets/logo_le_filochard.png";
import Icon from "./assets/logo_icon_le_filochard.png";
import Lazare from "./assets/lazareDanse_320x650.gif";
import Verre from "./assets/Verre.gif";

function App() {
  const [rawUrl, setRawUrl] = useState("");
  const [fetchedSongs, setFetchedSongs] = useState([]);
  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const [show, setShow] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [rotate, setRotate] = useState(false);
  const [error, setError] = useState(false);

  const nextSong = () => {
    setPlaying(false);
    setShow(false);
    setRotate(false);
    if (index + 1 >= fetchedSongs.length) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  };

  const prevSong = () => {
    setPlaying(false);
    setShow(false);
    setRotate(false);
    if (index - 1 < 0) {
      setIndex(fetchedSongs.length - 1);
    } else {
      setIndex(index - 1);
    }
  };

  const toggle = () => {
    setShow(!show);
  };

  const playPause = () => {
    setPlaying(!playing);
    setRotate(!rotate);
  };

  useEffect(() => {
    if (rawUrl) {
      const url = new URL(rawUrl);
      const params = url.searchParams;
      const playListId = params.get("list");

      if (playListId) {
        axios
          .get(
            "https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=35&playlistId=" +
              `${playListId}` +
              "&key=" +
              process.env.REACT_APP_YOUTUBE_API_KEY
          )
          .then((response) => {
            setFetchedSongs(response.data.items);
            setReady(true);
            setError(false);
          })
          .catch((err) => {
            console.error(err);
            setError(true);
          });
      }
    }
  }, [rawUrl]);

  return (
    <div className="App">
      <div className="main-title">
        <img src={Logo} alt="Nom du bar" className="logo" />
        <h3>Quizz musical bruyant et bordélique !</h3>
        {error === true ? <h3>Erreur !</h3> : null}
      </div>
      {ready === false ? (
        <div className="input-form">
          <h2>Copie colle le lien de la playlist</h2>
          <input
            placeholder="Le lien youtube de la playlist ici !"
            type="text"
            name="url"
            onChange={(e) => {
              e.preventDefault();
              setRawUrl(e.currentTarget.value);
            }}
          ></input>
        </div>
      ) : (
        <div className="main-content">
          {" "}
          <img className="verre" src={Verre} alt="Un bon verre" />
          <img className="lazare" src={Lazare} alt="Lazare qui danse" />
          {rotate ? (
            <img
              src={Icon}
              className="icon rotating"
              alt="mascotte du filochard"
            />
          ) : (
            <img className="icon" src={Icon} alt="Tête du logo du Filochard" />
          )}
          <div className="current-song">
            <h2 className="song-number">
              Chanson numéro {index + 1} / {fetchedSongs.length}
            </h2>
            <div className="text-content">
              <button className="reveal-button" onClick={toggle}>
                {show ? "Cacher le titre" : "Afficher le titre"}
              </button>
              {show ? (
                <h2 className="title">{fetchedSongs[index].snippet.title} </h2>
              ) : null}
              <ReactPlayer
                className="player"
                url={
                  "https://www.youtube.com/watch?v=" +
                  `${fetchedSongs[index].contentDetails.videoId}`
                }
                volume={1}
                controls={true}
                height="50%"
                width="50%"
                playing={playing}
              ></ReactPlayer>
            </div>
            <div className="controllers">
              <button className="prev-button" onClick={prevSong}>
                Précédent
              </button>
              {playing ? (
                <button onClick={playPause}>Pause</button>
              ) : (
                <button onClick={playPause}>Play</button>
              )}
              <button className="next-button" onClick={nextSong}>
                Suivant
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
