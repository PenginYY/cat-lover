import mongoose, { Schema } from "mongoose";

const keywordSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const Keyword =
  mongoose.models.User || mongoose.model("Keyword", keywordSchema);
export default Keyword;
