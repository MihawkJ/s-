import mongoose from "mongoose";

const animeSchema = new mongoose.Schema({
  title: String,
  description: String,
  genre: [String],
});

export default mongoose.model("Anime", animeSchema);
