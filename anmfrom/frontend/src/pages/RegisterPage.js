import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./ModulerRegister.module.css";
import axios from "axios";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  // RegisterPage.js
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Şifreler eşleşmiyor!");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/register`, // /api/register ekledim
        { username, email, password }
      );

      if (response.data.message === "Kayıt başarılı!") {
        alert("Kayıt başarılı! Giriş yapabilirsin.");
        navigate("/login");
      }
    } catch (error) {
      alert(
        `Kayıt başarısız: ${error.response?.data?.message || error.message}`
      ); // Hata mesajını netleştirdim
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Kayıt Ol</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Kullanıcı Adı"
          className={styles.input}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
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
        <input
          type="password"
          placeholder="Şifreyi Tekrar Girin"
          className={styles.input}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" className={styles.button}>
          Kayıt Ol
        </button>
      </form>
      <Link to="/login" className={styles.link}>
        Zaten hesabın var mı? Giriş Yap
      </Link>
    </div>
  );
}

export default RegisterPage;
