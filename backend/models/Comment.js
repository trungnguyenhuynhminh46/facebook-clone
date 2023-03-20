const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const schema = mongoose.Schema({
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
  reactions: [{ type: ObjectId, ref: "Reaction" }],
});
module.exports = mongoose.model("Comment", schema);
