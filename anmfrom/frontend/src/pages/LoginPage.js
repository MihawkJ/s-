import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./ModulerLogin.module.css"; // CSS Modules
import axios from "axios";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/login`,
        { email, password }
      );

      // Token'ı kontrol et
      if (!response.data.token) {
        throw new Error("Token alınamadı!");
      }

      localStorage.setItem("token", response.data.token);
      navigate("/profile");
    } catch (error) {
      // Hata mesajını detaylandır
      if (error.response) {
        alert(
          `Giriş başarısız: ${
            error.response.data.message || "Bilinmeyen hata!"
          }`
        );
      } else {
        alert("Bir hata oluştu: " + error.message);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Giriş Yap</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Şifre"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className={styles.button}>
          Giriş Yap
        </button>
      </form>
      <Link to="/register" className={styles.link}>
        Hesabın yok mu? Kayıt Ol
      </Link>
    </div>
  );
}

export default LoginPage;
