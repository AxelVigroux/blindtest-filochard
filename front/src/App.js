import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import ReactPlayer from "react-player";
import Logo from "./assets/logo_le_filochard.png";

function App() {
  const [playListId, setPlaylistId] = useState("");
  const [fetchedSongs, setFetchedSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const [show, setShow] = useState(false);
  const [playing, setPlaying] = useState(false);

  const playPause = () => {
    setPlaying(!playing);
  };

  console.log(fetchedSongs);

  useEffect(() => {
    axios
      .get(
        "https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=25&playlistId=PL-" +
          `${playListId}` +
          "&key=" +
          process.env.REACT_APP_YOUTUBE_API_KEY
      )
      .then((response) => {
        createSongs(response.data.items);
      })
      .catch((err) => {
        setError(err);
        console.error(err);
      });
  }, [playListId]);

  return (
    <div className="App">
      <div className="main-title">
        <img src={Logo} alt="logo du bar le filochard" />
      </div>
      {ready === false ? (
        <div className="input-form">
          <input
            type="text"
            name="url"
            onChange={(e) => {
              e.preventDefault();
              setPlaylistId(e.currentTarget.value);
            }}
          ></input>
        </div>
      ) : (
        <div className="main-content">
          <div className="left-button">
            <button className="prev-button" onClick={prevSong}>
              Précédent
            </button>
          </div>

          <div className="current-song">
            <h2>Chanson numéro {index + 1}</h2>
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
                  `"https://www.youtube.com/watch?v="` +
                  `${fetchedSongs[index].contentDetails.videoId}`
                }
                volume={1}
                controls={true}
                height="50%"
                width="50%"
                playing={playing}
              ></ReactPlayer>
            </div>
            <div className="controllers" onClick={playPause}>
              {playing ? <button>Pause</button> : <button>Play</button>}
            </div>
          </div>
          <div className="right-button">
            <button className="next-button" onClick={nextSong}>
              Suivant
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
