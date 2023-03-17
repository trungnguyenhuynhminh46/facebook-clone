const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const postSchema = mongoose.Schema({
  type: {
    type: String,
    enum: ["cover", "withImages", "onlyText"],
    default: "onlyText",
  },
  text: {
    type: String,
  },
  background: {
    type: String,
  },
  imagesList: {
    type: Array,
  },
  isSharedTo: {
    type: String,
    enum: ["public", "onlyMe", "friends"],
    default: "public",
  },
  isFeeling: {
    type: String,
  },
  checkedOutAt: {
    type: String,
  },
  tagedFriends: [{ type: ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Post", postSchema);
