// Login.js
import axios from "axios";

const handleLogin = async () => {
  try {
    const res = await axios.post("http://localhost:5000/api/login", {
      username,
      password,
    });
    localStorage.setItem("token", res.data.token); // Token'ı localStorage'da sakla
  } catch (err) {
    console.error(err);
  }
};
