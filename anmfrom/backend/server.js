import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware'ler
app.use(express.json());
app.use(cors());

// MongoDB Bağlantısı
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB bağlandı!"))
  .catch((err) => console.error("MongoDB bağlantı hatası:", err));

// Modeller
import User from "./models/User.js";
import Anime from "./models/Anime.js";
import Comment from "./models/Comment.js";

// Kullanıcı Kayıt
app.post("/api/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser)
      return res.status(400).json({ message: "Bu kullanıcı zaten kayıtlı!" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "Kayıt başarılı!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Kullanıcı Giriş
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Geçersiz email/şifre!" });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Geçersiz email/şifre!" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Anime Ekleme
app.post("/api/anime/add", async (req, res) => {
  try {
    const { title, description, genre } = req.body;
    const newAnime = new Anime({ title, description, genre });
    await newAnime.save();
    res.status(201).json(newAnime);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Yorum Ekleme
app.post("/api/comment/add", async (req, res) => {
  try {
    const { animeId, userId, text } = req.body;
    const newComment = new Comment({ animeId, userId, text });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Tüm Animeleri Listele
app.get("/api/anime/list", async (req, res) => {
  try {
    const animeList = await Anime.find();
    res.status(200).json(animeList);
  } catch (error) {
    res.status(500).json({ message: "Anime listesi alınamadı!" });
  }
});

// Sunucuyu Başlat
app.listen(PORT, () => console.log(`Server ${PORT} portunda çalışıyor!`));
