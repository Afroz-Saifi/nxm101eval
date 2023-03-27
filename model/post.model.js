const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, unique: true },
    device: { type: String, required: true },
    no_of_comments: { type: Number, required: true },
    userId: String,
  },
  { versionKey: false }
);

const postModel = mongoose.model("posts", postSchema);

module.exports = { postModel };
