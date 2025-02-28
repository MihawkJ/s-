import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../auth/AuthContext";
import jwtDecode from "jwt-decode";
import "./AnimeDetail.css";

const AnimeDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [anime, setAnime] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // Anime ve yorumları çek
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Anime detaylarını çek
        const animeResponse = await axios.get(
          `http://localhost:5000/api/anime/${id}`
        );
        setAnime(animeResponse.data);

        // Yorumları çek
        const commentsResponse = await axios.get(
          `http://localhost:5000/api/comments/${id}`
        );
        setComments(commentsResponse.data);
      } catch (error) {
        console.error("Veri çekme hatası:", error);
      }
    };
    fetchData();
  }, [id]);

  // Yeni yorum gönder
  const handleSubmitComment = async () => {
    if (!user) {
      alert("Yorum yapmak için giriş yapmalısınız!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/comments",
        {
          animeId: id,
          text: newComment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Yeni yorumu listeye ekle
      setComments([...comments, response.data]);
      setNewComment("");
    } catch (error) {
      console.error("Yorum gönderme hatası:", error);
    }
  };

  if (!anime) return <div className="loading">Yükleniyor...</div>;

  return (
    <div className="anime-details-container">
      {/* Anime Detayları */}
      <div className="anime-info">
        <img src={anime.image} alt={anime.title} className="anime-poster" />
        <h1>{anime.title}</h1>
        <p className="genre">{anime.genre}</p>
        <p className="description">{anime.description}</p>
      </div>

      {/* Yorumlar Bölümü */}
      <div className="comments-section">
        <h2>Yorumlar ({comments.length})</h2>

        {/* Yorum Listesi */}
        <div className="comment-list">
          {comments.map((comment) => (
            <div key={comment._id} className="comment-card">
              <div className="comment-header">
                <img
                  src={
                    comment.user.profileImage ||
                    "https://via.placeholder.com/40"
                  }
                  alt={comment.user.username}
                  className="user-avatar"
                />
                <span className="username">{comment.user.username}</span>
              </div>
              <p className="comment-text">{comment.text}</p>
            </div>
          ))}
        </div>

        {/* Yorum Yapma Alanı */}
        {user ? (
          <div className="comment-input">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Yorumunuzu yazın..."
            />
            <button onClick={handleSubmitComment} className="submit-button">
              Gönder
            </button>
          </div>
        ) : (
          <p className="login-warning">
            Yorum yapmak için <a href="/login">giriş yapın</a>.
          </p>
        )}
      </div>
    </div>
  );
};

export default AnimeDetails;
