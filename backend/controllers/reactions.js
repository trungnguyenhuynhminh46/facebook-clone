const mongoose = require("mongoose");
const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const Reaction = require("../models/Reaction");
const customError = require("../error/customError");
const { ObjectId } = mongoose.Types;
// CRUD 1 reaction phải thay đổi các bảng sau
// Reaction
// Post/Comment
// User
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
  let returnReaction = "return reaction";
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
    returnReaction = addedReaction;
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
    returnReaction = currentReaction;
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
    returnReaction = null;
  }
  // Nothing is change
  else {
    res.end();
  }
  return res.status(StatusCodes.OK).json(post);
};

const handleReactionComment = async (req, res) => {};

const addReaction = async (postId, commentId, userId, reaction) => {
  // Create a reaction
  // return res.status(StatusCodes.OK).json({ message: "Stop here!" });
  let addedReaction = await Reaction.create({
    reaction,
    user: new ObjectId(userId),
    post: new ObjectId(postId),
  });
  // Update post/comment's reactionsInfo
  if (postId) {
    const post = await Post.findById(postId);
    if (!post) {
      throw new customError(
        `The post with id ${postId} is not existed`,
        StatusCodes.NOT_FOUND
      );
    }
    post.reactionsInfo[reaction]++;
    post.reactions.push(addedReaction._id);
    post.save();
  }
  if (commentId) {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      throw new customError(
        `The comment with id ${commentId} is not existed`,
        StatusCodes.NOT_FOUND
      );
    }
    comment.reactionsInfo[reaction]++;
    comment.reactions[reaction]++;
    comment.save();
  }
  // Update User Model
  let reactionId = addedReaction._id;
  if (!!reactionId) {
    let user = await User.findById(userId);
    if (postId) {
      user.post_reactions.push(reactionId);
      user.save();
    } else if (commentId) {
      user.comment_reactions.push(postId);
      user.save();
    }
  }
  return addedReaction;
};

const updateReaction = async (req, res) => {
  const { reactionId } = req.params;
  const { newReaction } = req.body;
  const updatedReaction = await Reaction.findByIdAndUpdate(
    reactionId,
    {
      reaction: newReaction,
    },
    {
      returnDocument: "before",
      runValidators: true,
    }
  );
  if (!updatedReaction) {
    throw new customError(
      `The reaction with id ${reactionId} is not found.`,
      StatusCodes.NOT_FOUND
    );
  }
  // Update post/comment's reactionsInfo
  const oldReaction = updatedReaction.reaction;
  const { post: postId, comment: commentId } = updatedReaction;
  if (!postId && !commentId) {
    throw new customError(
      "Why this reaction have no postId or commentId?",
      StatusCodes.NOT_ACCEPTABLE
    );
  }
  if (postId) {
    const post = await Post.findById(postId);
    if (!post) {
      throw new customError(
        `The post with id ${postId} is not existed`,
        StatusCodes.NOT_FOUND
      );
    }
    post.reactionsInfo[oldReaction]--;
    post.reactionsInfo[newReaction]++;
    post.save();
  }
  if (commentId) {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      throw new customError(
        `The comment with id ${commentId} is not existed`,
        StatusCodes.NOT_FOUND
      );
    }
    comment.reactionsInfo[oldReaction]--;
    comment.reactionsInfo[newReaction]++;
    comment.save();
  }
  const returnReaction = await Reaction.findById(reactionId);
  // No Need To Update User Model
  return res.status(StatusCodes.OK).json({ data: returnReaction });
};

const deleteReaction = async (req, res) => {
  const { reactionId } = req.params;
  const deletedReaction = await Reaction.findByIdAndRemove(reactionId, {
    returnDocument: "before",
  });
  if (!deletedReaction) {
    throw new customError(
      `The reaction with id ${reactionId} is not found.`,
      StatusCodes.NOT_FOUND
    );
  }
  // Update post/comment's reactionsInfo
  const { post: postId, comment: commentId } = deletedReaction;
  if (!postId && !commentId) {
    throw new customError(
      "Why this reaction have no postId or commentId?",
      StatusCodes.NOT_ACCEPTABLE
    );
  }
  if (postId) {
    const post = await Post.findById(postId);
    if (!post) {
      throw new customError(
        `The post with id ${postId} is not existed`,
        StatusCodes.NOT_FOUND
      );
    }
    post.reactionsInfo[deletedReaction.reaction]--;
    post.reactions = post.reactions.filter((reaction) => {
      return reaction.toString() !== reactionId.toString();
    });
    post.save();
  }
  if (commentId) {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      throw new customError(
        `The comment with id ${commentId} is not existed`,
        StatusCodes.NOT_FOUND
      );
    }
    comment.reactionsInfo[deletedReaction.reaction]--;
    comment.save();
  }
  // Update User database
  const { user: userId } = deletedReaction;
  // Update User Model
  const user = await User.findById(userId);
  if (postId) {
    user.post_reactions = user.post_reactions.filter((reaction) => {
      return reaction.toString() !== deletedReaction._id.toString();
    });
    user.save();
  } else if (commentId) {
    user.comment_reactions = user.comment_reactions.filter((reaction) => {
      return reaction.toString() !== deletedReaction._id;
    });
    user.save();
  }
  return res.status(StatusCodes.OK).json({ data: {} });
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
  const returnReactions = Reaction.find({
    post: postId,
  });
  return res.status(StatusCodes.OK).json({ data: returnReactions });
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

module.exports = {
  handleReactionPost,
  getReactionsByPostId,
  getReactionByPostIdAndUserId,
};
