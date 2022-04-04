/* TENTATIVE EN LIST */
/* <ul>
  {fetchedSongs.map((song, idx) => (
    <li key={idx}>
      {clicked === false ? (
        <button
          onClick={() => {
            console.log("LOG DE IDX: ", idx);
            setClicked(true, song);
          }}
        >
          Afficher le titre
        </button>
      ) : (
        <div>
          {song.snippet.title}
          <button
            onClick={() => {
              setClicked(false);
            }}
          >
            Cacher le titre
          </button>
        </div>
      )}
    </li>
  ))}
</ul>; */

/* PLAYER YOUTUBE */

// <iframe
//             width="560"
//             height="315"
//             src={url + `${song.contentDetails.videoId}`}
//             frameborder="0"
//             allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
//           ></iframe>
