import mongoose, { Schema } from "mongoose";
import Keyword from "./keyword";

const favoriteSchema = new Schema({
    useId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    Keywords: [{
        type: Schema.Types.ObjectId,
        ref: "Keyword"
    }],
}, { timestamps: true });

const Favorite = mongoose.models.Favorite || mongoose.model("Favorite", favoriteSchema);
export default Favorite;