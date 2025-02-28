import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ModulerLogin.css"; // CSS dosyasını ekledim

function LoginPage() {
  const [username, setUsername] = useState(""); // username state'i eklendi
  const [password, setPassword] = useState(""); // password state'i eklendi

  const handleSubmit = (e) => {
    e.preventDefault();
    // Giriş işlemleri buraya
  };

  return (
    <div className="login-container">
      <h2>Giriş Yap</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Kullanıcı Adı"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Giriş Yap</button>
      </form>
      <p>
        Hesabın yok mu? <Link to="/register">Kayıt Ol</Link>
      </p>
    </div>
  );
}

export default LoginPage; // Doğru export
