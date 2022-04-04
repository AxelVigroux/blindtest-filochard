import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [playListId, setPlaylistId] = useState("");
  const [fetchedSongs, setFetchedSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [clicked, setClicked] = useState(false);
  const [songs, setSongs] = useState([]);
  const [songsData, setSongsData] = useState("");
  const [index, setIndex] = useState(1);

  const createSongs = (data) => {
    setSongs([...songs, { index, data, done: false }]);
    setSongsData("");
    setIndex(index + 1);
  };

  console.log({ fetchedSongs });
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

  console.log("SONGS", { songs });

  return (
    <div className="App">
      <h1>Filo Right</h1>
      <input
        type="text"
        name="url"
        onChange={(e) => {
          e.preventDefault();
          setPlaylistId(e.currentTarget.value);
        }}
      ></input>
      <div className="playlist">
        <ul>
          {songs.map((song, idx) => (
            <li key={idx}>
              {clicked === false ? (
                <button
                  onClick={() => {
                    console.log("LOG DE IDX: ", idx);
                    setClicked(true);
                  }}
                >
                  Afficher le titre
                </button>
              ) : (
                <p>
                  {" "}
                  {song.snippet.title}
                  <button
                    onClick={() => {
                      setClicked(false);
                    }}
                  >
                    Cacher le titre
                  </button>
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
