import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./andet.css";

const AnimeList = () => {
  const [animes, setAnimes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/anime")
      .then((response) => response.json())
      .then((data) => setAnimes(data));
  }, []);

  return (
    <div className="container">
      <h1>Anime Listesi</h1>
      <div className="anime-list">
        {animes.map((anime) => (
          <div key={anime._id} className="anime-card">
            <Link to={`/anime/${anime._id}`}>
              <img
                src={anime.image}
                alt={anime.title}
                style={{ width: "100%", maxWidth: "300px" }}
              />
              <h2>{anime.title}</h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimeList;
