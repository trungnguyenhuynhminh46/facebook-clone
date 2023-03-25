const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const schema = mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["onlyText", "cover", "withImages"],
      default: "onlyText",
    },
    user: {
      type: ObjectId,
      ref: "User",
      require: true,
    },
    text: String,
    coverId: Number,
    imagesList: [String],
    isSharedTo: {
      type: String,
      enum: ["public", "friends", "onlyMe"],
      default: "public",
    },
    isFeeling: String,
    checkedOutAt: String,
    tagedFriends: {
      type: [{ type: ObjectId, ref: "User" }],
      default: [],
    },
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
    reactions: {
      type: [{ type: ObjectId, ref: "Reaction" }],
      default: [],
    },
    comments: {
      type: [{ type: ObjectId, ref: "Comment" }],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", schema);
