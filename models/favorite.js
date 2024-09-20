import mongoose, { Schema } from "mongoose";

const favoriteSchema = new Schema({
    // useId, catmemeId, name of the card
    useId: {
        type: Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
        required: true,
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

const Favorite = mongoose.models.Favorite || mongoose.model("Favorite", favoriteSchema);
export default Favorite;