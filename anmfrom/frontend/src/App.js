// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext"; // AuthProvider'ı import edin
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AnimeList from "./pages/animelist";
import AnimeDetail from "./pages/AnimeDetail";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import "./index.css";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";

function App() {
  return (
    <Router>
      <AuthProvider>
        {" "}
        {/* Tüm uygulamayı AuthProvider ile sarmalayın */}
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/anime" element={<AnimeList />} />
            <Route path="/anime/:id" element={<AnimeDetail />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
