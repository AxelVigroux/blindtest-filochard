import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [playListId, setPlaylistId] = useState("");
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    axios
      .get(
        "https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=25&playlistId=PL-" +
          `${playListId}` +
          "&key=" +
          process.env.REACT_APP_YOUTUBE_API_KEY
      )
      .then((response) => {
        setSongs(response.data.items);
      })
      .catch((err) => {
        setError(err);
        console.error(err);
      });
  }, [playListId]);

  console.log("SONGS", songs);
  console.log(playListId);

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
      <ul>
        {songs.map((song, idx) => (
          <li key={idx}>{song.snippet.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
