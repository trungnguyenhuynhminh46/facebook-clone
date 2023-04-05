const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const Comment = require("./Comment");
const Post = require("./Post");

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
    commentsCount: {
      type: Number,
      default: 0,
    },
    sharedCount: {
      type: Number,
      default: 0,
    },
    // Xem xét bỏ
    reactions: {
      type: [{ type: ObjectId, ref: "Reaction" }],
      default: [],
    },
    // Xem xét bỏ
    comments: {
      type: [{ type: ObjectId, ref: "Comment" }],
      default: [],
    },
    // Xem xét bỏ
    sharedUsers: {
      type: [{ type: ObjectId, ref: "User" }],
      default: [],
    },
  },
  { timestamps: true }
);
// Methods
schema.method("updateCommentsCount", async function () {
  Comment.countDocuments({ post: this._id }, function (err, count) {
    if (err) {
      console.log(err);
    }
    if (!err) {
      this.commentsCount = count;
      this.save();
    }
  });
});

module.exports = mongoose.model("Post", schema);
