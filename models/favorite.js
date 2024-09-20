import mongoose, { Schema } from "mongoose";

const favoriteSchema = new Schema({
  userEmail: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: false,
  },
  selectedTag: {
    type: String,
    required: false,
  },
  message: {
    type: String,
    required: false,
  },
  catImageUrl: {
    type: String,
    required: true,
  },
});

const Favorite =
  mongoose.models.Favorite || mongoose.model("Favorite", favoriteSchema);
export default Favorite;
