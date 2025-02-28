// frontend/src/pages/Register.js
import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/register", formData);
      alert("Kayıt başarılı! Giriş yapabilirsiniz.");
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  return (
    <div className="auth-form">
      <h2>Kayıt Ol</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Kullanıcı Adı"
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Şifre"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <button type="submit">Kayıt Ol</button>
      </form>
    </div>
  );
};

export default Register;
