import { Schema, model, models } from "mongoose";

const HistorySchema = new Schema(
    {
        catId: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        fontSize: {
            type: Number,
            required: true
        },
        fontColor: {
            type: String,
            required: true
        },
        memeUrl: {
            type: String,
            required: true
        },
        userEmail: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }
);

const History = models.History || model("History", HistorySchema);

export default History;