const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const schema = mongoose.Schema(
  {
    reaction: {
      type: String,
      enum: ["like", "love", "haha", "wow", "sad", "angry"],
      required: true,
    },
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    post: {
      type: ObjectId,
      ref: "Post",
    },
    comment: {
      type: ObjectId,
      ref: "Comment",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reaction", schema);
