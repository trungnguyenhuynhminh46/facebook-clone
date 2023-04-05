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
    childrenComments: {
      type: [{ type: ObjectId, ref: "Comment" }],
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
  },
  { timestamps: true }
);

schema.pre("remove", async function (next) {
  const childComments = await this.model("Comment").find({
    parentId: this._id,
  });
  for (const childComment of childComments) {
    await childComment.remove();
  }
  next();
});

// Methods
module.exports = mongoose.model("Comment", schema);
