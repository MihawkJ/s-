import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";

// Express uygulaması oluştur
const app = express();
const PORT = 5000;

// Middleware'ler
app.use(cors()); // Frontend-backend iletişimi için
app.use(express.json()); // JSON verilerini işlemek için

// MongoDB bağlantısı
mongoose

  .connect("mongodb://localhost:27017/anime-forum", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB bağlantısı başarılı."))
  .catch((err) => console.log("MongoDB bağlantı hatası:", err));
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB bağlandı!"))
  .catch((err) => console.error("MongoDB bağlantı hatası:", err)); // Hata mesajını netleştirdim

// Anime Modeli
const AnimeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Anime = mongoose.model("Anime", AnimeSchema);

// Yorum Modeli
const CommentSchema = new mongoose.Schema({
  animeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Anime",
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Comment = mongoose.model("Comment", CommentSchema);

// Anime CRUD API'leri

// 1. Anime Ekleme (Create)
app.post("/api/anime", async (req, res) => {
  const { title, description, image, genre } = req.body;

  const anime = new Anime({
    title,
    description,
    image,
    genre,
  });

  try {
    const newAnime = await anime.save();
    res.status(201).json(newAnime);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 2. Anime Listeleme (Read)
app.get("/api/anime", async (req, res) => {
  try {
    const animes = await Anime.find();
    res.json(animes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 3. Anime Detay Getirme (Read)
app.get("/api/anime/:id", async (req, res) => {
  try {
    const anime = await Anime.findById(req.params.id);
    res.json(anime);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 4. Anime Güncelleme (Update)
app.put("/api/anime/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, image, genre } = req.body;

  try {
    const updatedAnime = await Anime.findByIdAndUpdate(
      id,
      { title, description, image, genre },
      { new: true }
    );
    res.json(updatedAnime);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 5. Anime Silme (Delete)
app.delete("/api/anime/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Anime.findByIdAndDelete(id);
    res.json({ message: "Anime silindi." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Yorum CRUD API'leri

// 1. Yorum Ekleme (Create)
app.post("/api/comment", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "GIZLI_ANAHTAR");

    const comment = new Comment({
      ...req.body,
      user: decoded.id, // Yorumu kullanıcıya bağla
    });
    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(401).json({ error: "Yetkisiz işlem!" });
  }
});

// 2. Yorum Listeleme (Read)
app.get("/api/comment/:animeId", async (req, res) => {
  const { animeId } = req.params;

  try {
    const comments = await Comment.find({ animeId });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 3. Yorum Güncelleme (Update)
app.put("/api/comment/:id", async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { text },
      { new: true }
    );
    res.json(updatedComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 4. Yorum Silme (Delete)
app.delete("/api/comment/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Comment.findByIdAndDelete(id);
    res.json({ message: "Yorum silindi." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Server'ı başlat
app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor.`);
});

const User = require("./models/User");

// Kayıt Olma
app.post("/api/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // E-posta ve kullanıcı adı kontrolü
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Bu e-posta veya kullanıcı adı zaten kayıtlı!" });
    }

    // Şifreyi hashle
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "Kayıt başarılı!" });
  } catch (error) {
    res.status(500).json({ message: error.message }); // Hata mesajını netleştirdim
  }
});

// Giriş Yapma
// server/index.js
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kullanıcıyı e-posta ile bul
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Geçersiz e-posta veya şifre!" });
    }

    // Şifreyi karşılaştır
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Geçersiz e-posta veya şifre!" });
    }

    // JWT token oluştur ve gönder
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ token: token }); // Yanıtı netleştir
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası: " + error.message }); // Hata mesajını detaylandır
  }
});

// server.js
const jwt = require("jsonwebtoken");

// Token oluştur
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ error: "Kullanıcı adı veya şifre yanlış!" });
  }

  const token = jwt.sign({ id: user._id }, "GIZLI_ANAHTAR", {
    expiresIn: "1h",
  });
  res.json({ token });
});

// Token doğrula (Middleware)
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token bulunamadı!" });

  try {
    const decoded = jwt.verify(token, "GIZLI_ANAHTAR");
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ error: "Geçersiz token!" });
  }
};

// Korumalı API
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({ message: "Bu API sadece giriş yapmış kullanıcılar için!" });
});

app.post("/api/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Kullanıcı var mı kontrolü
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "Kullanıcı zaten kayıtlı!" });
    }

    // Şifreyi hashle
    const hashedPassword = await bcrypt.hash(password, 10);

    // Yeni kullanıcıyı kaydet
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "Kullanıcı kaydedildi!" });
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası!" });
  }
});

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// Backend'de test için:
const user = await User.findOne({ email: "test@example.com" });
console.log("Hashlenmiş şifre:", user.password); // Hash'in doğru olduğundan emin olun
