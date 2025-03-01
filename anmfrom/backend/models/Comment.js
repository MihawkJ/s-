import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  animeId: String,
  userId: String,
  text: String,
});

const Comment = mongoose.model("Comment", commentSchema);
export default Comment; // Bu satırı ekle!
