import axios from "axios";

const iaxios = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3/playlistItems",
});

export default iaxios;
