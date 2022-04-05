import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
<<<<<<< HEAD
import ReactPlayer from "react-player";
import Logo from "./assets/logo_le_filochard.png";
=======
>>>>>>> parent of cdd70c9 (everything it's working, go css now !)

function App() {
  const [playListId, setPlaylistId] = useState("");
  const [fetchedSongs, setFetchedSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const [show, setShow] = useState(false);

<<<<<<< HEAD
  const playPause = () => {
    setPlaying(!playing);
  };

  console.log(fetchedSongs);
=======
  const nextSong = () => {
    if (index + 1 >= fetchedSongs.length) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  };

  const prevSong = () => {
    if (index - 1 < 0) {
      setIndex(fetchedSongs.length - 1);
    } else {
      setIndex(index - 1);
    }
  };

  const toggle = () => {
    setShow(!show);
  };

  console.log({ fetchedSongs });
>>>>>>> parent of cdd70c9 (everything it's working, go css now !)

  // const url = "https://www.youtube.com/embed/";

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

  console.log("SONGS", { fetchedSongs });

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
          <h2>Chanson numéro {index}</h2>
          <div className="current-song">
            <button onClick={prevSong}>Précédent</button>
            <button onClick={toggle}>
              {show ? "Cacher le titre" : "Voir le titre"}
            </button>
            {show ? fetchedSongs[index].snippet.title : null}
            <button onClick={nextSong}>Suivant</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
