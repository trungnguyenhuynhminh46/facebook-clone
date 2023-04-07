const mongoose = require("mongoose");
const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const Reaction = require("../models/Reaction");
const customError = require("../error/customError");
const { ObjectId } = mongoose.Types;
const handleReactionPost = async (req, res) => {
  // console.log("OK");
  const { id: userId } = req.user;
  const user = await User.findById(userId);
  if (!user) {
    throw new customError(
      `The user with id ${userId} is not existed`,
      StatusCodes.NOT_FOUND
    );
  }
  const { postId } = req.params;
  const post = await Post.findById(postId);
  if (!post) {
    throw new customError(
      `The post with id ${postId} is not existed`,
      StatusCodes.NOT_FOUND
    );
  }
  const { reaction } = req.body;
  const currentReaction = await Reaction.findOne({
    user: new ObjectId(userId),
    post: new ObjectId(postId),
  });
  // Create new reaction
  if (!currentReaction) {
    // Reaction
    let addedReaction = await Reaction.create({
      reaction,
      user: new ObjectId(userId),
      post: new ObjectId(postId),
    });
    // Post
    post.reactionsInfo[reaction]++;
    post.reactions.push(addedReaction._id);
    await post.save();
    // User
    user.post_reactions.push(addedReaction._id);
    await user.save();
  }
  // Update old reaction
  else if (currentReaction && currentReaction.reaction !== reaction) {
    // console.log(`update ${currentReaction.reaction} ${reaction}`);
    const oldReaction = currentReaction.reaction;
    const newReaction = reaction;
    // Reaction
    currentReaction.reaction = newReaction;
    await currentReaction.save();
    // Post
    post.reactionsInfo[oldReaction]--;
    post.reactionsInfo[newReaction]++;
    await post.save();
    // User
    // No Need To Update User Model
  }
  // Delete reaction
  else if (currentReaction && currentReaction.reaction === reaction) {
    // console.log(`delete ${currentReaction.reaction} ${reaction}`);
    const oldReaction = currentReaction.reaction;
    const oldReactionId = currentReaction._id;
    // console.log(currentReaction);
    // Reaction
    await Reaction.findByIdAndDelete(currentReaction._id);
    // Post
    post.reactionsInfo[oldReaction]--;
    post.reactions = post.reactions.filter((reactionId) => {
      return reactionId.toString() !== oldReactionId.toString();
    });
    await post.save();
    // User
    user.post_reactions = user.post_reactions.filter((reactionId) => {
      return reactionId.toString() !== oldReactionId.toString();
    });
    await user.save();
  }
  // Nothing is change
  else {
    res.end();
  }
  return res.status(StatusCodes.OK).json(post);
};
const handleReactionComment = async (req, res) => {
  // console.log("OK");
  const { id: userId } = req.user;
  const user = await User.findById(userId);
  if (!user) {
    throw new customError(
      `The user with id ${userId} is not existed`,
      StatusCodes.NOT_FOUND
    );
  }
  const { commentId } = req.params;
  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new customError(
      `The comment with id ${commentId} is not existed`,
      StatusCodes.NOT_FOUND
    );
  }
  const { reaction } = req.body;
  const currentReaction = await Reaction.findOne({
    user: new ObjectId(userId),
    comment: new ObjectId(commentId),
  });
  // Create new reaction
  if (!currentReaction) {
    // Reaction
    let addedReaction = await Reaction.create({
      reaction,
      user: new ObjectId(userId),
      comment: new ObjectId(commentId),
    });
    // Comment
    comment.reactionsInfo[reaction]++;
    comment.reactions.push(addedReaction._id);
    await comment.save();
    // User
    user.comment_reactions.push(addedReaction._id);
    await user.save();
  }
  // Update old reaction
  else if (currentReaction && currentReaction.reaction !== reaction) {
    // console.log(`update ${currentReaction.reaction} ${reaction}`);
    const oldReaction = currentReaction.reaction;
    const newReaction = reaction;
    // Reaction
    currentReaction.reaction = newReaction;
    await currentReaction.save();
    // Comment
    comment.reactionsInfo[oldReaction]--;
    comment.reactionsInfo[newReaction]++;
    await comment.save();
    // User
    // No Need To Update User Model
  }
  // Delete reaction
  else if (currentReaction && currentReaction.reaction === reaction) {
    // console.log(`delete ${currentReaction.reaction} ${reaction}`);
    const oldReaction = currentReaction.reaction;
    const oldReactionId = currentReaction._id;
    // console.log(currentReaction);
    // Reaction
    await Reaction.findByIdAndDelete(currentReaction._id);
    // Comment
    comment.reactionsInfo[oldReaction]--;
    comment.reactions = comment.reactions.filter((reactionId) => {
      return reactionId.toString() !== oldReactionId.toString();
    });
    await comment.save();
    // User
    user.comment_reactions = user.comment_reactions.filter((reactionId) => {
      return reactionId.toString() !== oldReactionId.toString();
    });
    await user.save();
  }
  // Nothing is change
  else {
    res.end();
  }
  return res.status(StatusCodes.OK).json(comment);
};

const getReactionsByPostId = async (req, res) => {
  const { postId } = req.params;
  const post = await Post.findById(postId);
  if (!post) {
    throw new customError(
      `The post with id ${postId} is not found.`,
      StatusCodes.NOT_FOUND
    );
  }
  const returnReactions = await Reaction.find({
    post: new ObjectId(postId),
  });
  return res.status(StatusCodes.OK).json(returnReactions);
};

const getReactionsByCommentId = async (req, res) => {
  const { commentId } = req.params;
  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new customError(
      `The comment with id ${commentId} is not found.`,
      StatusCodes.NOT_FOUND
    );
  }
  const returnReactions = await Reaction.find({
    comment: new ObjectId(commentId),
  });
  return res.status(StatusCodes.OK).json(returnReactions);
};

const getReactionByPostIdAndUserId = async (req, res) => {
  const { postId } = req.params;
  const post = await Post.findById(postId);
  if (!post) {
    throw new customError(
      `The post with id ${postId} is not found`,
      StatusCodes.NOT_FOUND
    );
  }
  const { id: userId } = req.user;
  const reaction = await Reaction.findOne({
    user: new ObjectId(userId),
    post: new ObjectId(postId),
  });
  return res.status(StatusCodes.OK).json(reaction);
};
const getReactionByCommentIdAndUserId = async (req, res) => {
  const { commentId } = req.params;
  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new customError(
      `The comment with id ${commentId} is not found`,
      StatusCodes.NOT_FOUND
    );
  }
  const { id: userId } = req.user;
  const reaction = await Reaction.findOne({
    user: new ObjectId(userId),
    comment: new ObjectId(commentId),
  });
  return res.status(StatusCodes.OK).json(reaction);
};

module.exports = {
  handleReactionPost,
  handleReactionComment,
  getReactionsByPostId,
  getReactionsByCommentId,
  getReactionByPostIdAndUserId,
  getReactionByCommentIdAndUserId,
};
