const { StatusCodes } = require("http-status-codes");
const customError = require("../error/customError");
const Comment = require("../models/Comment");
const Post = require("../models/Post");
const User = require("../models/User");
const Reaction = require("../models/Reaction");
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
  }).populate({
    path: "user",
    select: "first_name last_name username email picture gender",
  });
  if (!comments) {
    throw new customError(
      "No root comment is found! Please try again!",
      StatusCodes.NOT_FOUND
    );
  }
  return res.status(StatusCodes.OK).json(comments);
};
const getCommentByCommentId = async (req, res) => {
  const { commentId } = req.params;
  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new customError(`The comment with id ${commentId} is not found`);
  }
  return res.status(StatusCodes.OK).json(comment);
};
const getCommentsByParentComment = async (req, res) => {
  const { commentId } = req.params;
  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new customError(`Comment with id ${commentId} is not existed`);
  }
  const commentIds = comment.replies;
  const comments = await Comment.find({ _id: { $in: commentIds } }).populate({
    path: "user",
    select: "first_name last_name username email picture gender",
  });
  return res.status(StatusCodes.OK).json(comments);
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
    parentComment: parentId ? new ObjectId(parentId) : undefined,
  });
  // Update in post state
  await post.updateCommentsCount();
  // Update parent comment
  const parentComment = await Comment.findById(parentId);
  if (parentComment) {
    parentComment.childrenComments.push(new ObjectId(parentId));
    parentComment.save();
  }
  return res.status(StatusCodes.OK).json(post);
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
  const postId = updatedComment.post;
  const post = await Post.findById(postId);
  if (!post) {
    throw new customError(`The post with id ${postId} is not existed`);
  }
  await post.updateCommentsCount();
  if (!updatedComment) {
    throw new customError(`Comment with id ${commentId} is not existed`);
  }
  return res.status(StatusCodes.OK).json(post);
};
const deleteComment = async (req, res) => {
  const { commentId } = req.params;
  const comment = await Comment.findOneAndDelete({ _id: commentId });
  // Update in post state
  const postId = comment.post;
  const post = await Post.findById(postId);
  await post.updateCommentsCount();
  // Update parent comment
  const parentComment = await Comment.findById(comment.parentComment);
  if (parentComment) {
    parentComment.childrenComments = parentComment.childrenComments.filter(
      (c) => {
        return c.toString() !== commentId.toString();
      }
    );
    parentComment.save();
  }
  return res
    .status(StatusCodes.OK)
    .json({ parentComment: comment.parentComment, post });
};
const commentsDetailByPostId = async (req, res) => {
  const { postId } = req.params;
  // console.log(postId);
  const post = await Post.findById(postId);
  if (!post) {
    throw new customError(
      `The post with id ${postId} is not found`,
      StatusCodes.NOT_FOUND
    );
  }
  const comments = await Comment.find({
    post: new ObjectId(postId),
  }).populate({
    path: "user",
    select: "_id username",
  });
  // console.log(comments);
  const usernameObject = comments.reduce((acc, comment) => {
    if (!acc[comment.user._id]) {
      acc[comment.user._id] = comment.user.username;
    }
    return acc;
  }, {});
  // console.log(usernameObject);
  const usernamesList = Object.values(usernameObject);
  return res.status(StatusCodes.OK).json({ usernamesList });
};

module.exports = {
  getRootCommentsByPostId,
  getCommentsByParentComment,
  getCommentByCommentId,
  addComment,
  updateComment,
  deleteComment,
  commentsDetailByPostId,
};
