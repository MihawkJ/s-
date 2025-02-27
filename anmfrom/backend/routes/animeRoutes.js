const express = require("express");
const Anime = require("../models/Anime");

const router = express.Router();

// Tüm anime başlıklarını getir
router.get("/", async (req, res) => {
  try {
    const animes = await Anime.find();
    res.json(animes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Yeni anime başlığı ekle
router.post("/", async (req, res) => {
  const anime = new Anime({
    title: req.body.title,
    description: req.body.description,
  });

  try {
    const newAnime = await anime.save();
    res.status(201).json(newAnime);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
