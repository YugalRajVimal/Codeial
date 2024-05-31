const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    comment: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment",
      },
    ],
    like: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "like",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const post = mongoose.model("post", postSchema);
module.exports = post;
