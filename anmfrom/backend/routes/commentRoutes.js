const express = require("express");
const Comment = require("../models/Comment");

const router = express.Router();

// Bir animeye ait yorumları getir
router.get("/:animeId", async (req, res) => {
  try {
    const comments = await Comment.find({ animeId: req.params.animeId });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Yeni yorum ekle
router.post("/", async (req, res) => {
  const comment = new Comment({
    animeId: req.body.animeId,
    text: req.body.text,
    user: req.body.user,
  });

  try {
    const newComment = await comment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
