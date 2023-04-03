const { StatusCodes } = require("http-status-codes");
const customError = require("../error/customError");
const Comment = require("../models/Comment");
const Post = require("../models/Post");
const User = require("../models/User");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const getRootCommentsByPostId = async (req, res) => {
  const { postId } = req.params;
  const post = await Post.findById(postId);
  if (!post) {
    throw new customError(`The post with id ${postId} is not existed`);
  }
  const comments = await Comment.find({
    parentComment: null,
    post: new ObjectId(postId),
  });
  if (!comments) {
    throw new customError(
      "No root comment is found! Please try again!",
      StatusCodes.NOT_FOUND
    );
  }
  return res.status(StatusCodes.OK).json({ comments, postId });
};
const getCommentsByParentComment = async (req, res) => {
  const { commentId } = req.params;
  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new customError(`Comment with id ${commentId} is not existed`);
  }
  const commentIds = comment.replies;
  const comments = await Comment.find({ _id: { $in: commentIds } });
  return res.status(StatusCodes.OK).json({ comments, parentId: commentId });
};
const addComment = async (req, res) => {
  const { userId, text, image, postId, parentId } = req.body;
  const user = await User.findById(userId);
  if (!user) {
    throw new customError(`The user with id ${userId} is not existed`);
  }
  const post = await Post.findById(postId);
  if (!post) {
    throw new customError(`The post with id ${postId} is not existed`);
  }
  const addedComment = await Comment.create({
    user: new ObjectId(userId),
    text,
    image,
    post: new ObjectId(postId),
    parentComment: new ObjectId(parentId),
  });
  // Update in post state
  post.commentsCount += 1;
  post.save;
  return res.status(StatusCodes.OK).json(addedComment);
};
const updateComment = async (req, res) => {
  const { commentId } = req.params;
  const { text, image } = req.body;
  const updatedComment = await Comment.findByIdAndUpdate(
    commentId,
    {
      text,
      image,
    },
    {
      returnDocument: "after",
    }
  );
  if (!updatedComment) {
    throw new customError(`Comment with id ${commentId} is not existed`);
  }
  return res.status(StatusCodes.OK).json(updatedComment);
};
const deleteComment = async (req, res) => {
  const { commentId } = req.params;
  const deletedComment = await Comment.findByIdAndUpdate(commentId);
  if (!deletedComment) {
    throw new customError(`Comment with id ${commentId} is not existed`);
  }
  // Update in post state
  const post = await Post.findById(deletedComment.post);
  post.commentsCount -= 1;
  post.save();
  return res
    .status(StatusCodes.OK)
    .json({ parentComment: deletedComment.parentComment });
};

module.exports = {
  getRootCommentsByPostId,
  getCommentsByParentComment,
  addComment,
  updateComment,
  deleteComment,
};
