import React, { useState } from "react";
import "./Home.css";

const Home = () => {
  const [activeTab, setActiveTab] = useState("for-you"); // Varsayılan sekme

  // Örnek Veriler (Sonradan API'den çekilebilir)
  const followedAnime = [
    {
      id: 1,
      title: "Naruto",
      image: "https://via.placeholder.com/300",
      episodes: 220,
    },
    {
      id: 2,
      title: "Attack on Titan",
      image: "https://via.placeholder.com/300",
      episodes: 75,
    },
  ];

  const recommendedAnime = [
    {
      id: 3,
      title: "Demon Slayer",
      image: "https://via.placeholder.com/300",
      episodes: 26,
    },
    {
      id: 4,
      title: "Jujutsu Kaisen",
      image: "https://via.placeholder.com/300",
      episodes: 24,
    },
  ];

  return (
    <div className="home-page">
      {/* Sekmeler */}
      <div className="tab-buttons">
        <button
          className={`tab ${activeTab === "followed" ? "active" : ""}`}
          onClick={() => setActiveTab("followed")}
        >
          Takip Ettiklerin
        </button>
        <button
          className={`tab ${activeTab === "for-you" ? "active" : ""}`}
          onClick={() => setActiveTab("for-you")}
        >
          Senin İçin
        </button>
      </div>

      {/* İçerik */}
      <div className="tab-content">
        {activeTab === "followed" && (
          <div className="hanime-grid">
            {followedAnime.map((anime) => (
              <div key={anime.id} className="hanime-card">
                <img src={anime.image} alt={anime.title} />
                <h3>{anime.title}</h3>
                <p>{anime.episodes} Bölüm</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "for-you" && (
          <div className="hanime-grid">
            {recommendedAnime.map((anime) => (
              <div key={anime.id} className="hanime-card">
                <img src={anime.image} alt={anime.title} />
                <h3>{anime.title}</h3>
                <p>{anime.episodes} Bölüm</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
