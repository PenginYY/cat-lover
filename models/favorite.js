import mongoose, { Schema } from "mongoose";

const favoriteSchema = new Schema({
    useId: {
        type: Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    Keywords: [{
        type: Schema.Types.ObjectId,
        ref: "Keyword", // Reference to the Keyword model
    }],
}, { timestamps: true });

const Favorite = mongoose.models.Favorite || mongoose.model("Favorite", favoriteSchema);
export default Favorite;