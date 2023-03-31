const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const schema = mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    image: String,
    post: { type: ObjectId, ref: "Post" },
    parentComment: { type: ObjectId, ref: "Comment" },
    replies: [{ type: ObjectId, ref: "Comment" }],
    reactionsInfo: {
      like: {
        type: Number,
        default: 0,
      },
      love: {
        type: Number,
        default: 0,
      },
      haha: {
        type: Number,
        default: 0,
      },
      wow: {
        type: Number,
        default: 0,
      },
      sad: {
        type: Number,
        default: 0,
      },
      angry: {
        type: Number,
        default: 0,
      },
    },
    reactions: [{ type: ObjectId, ref: "Reaction" }],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Comment", schema);
