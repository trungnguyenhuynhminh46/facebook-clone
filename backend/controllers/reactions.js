import { StatusCodes } from "http-status-codes";
import Post from "../models/Post";
import Comment from "../models/Comment";
import Reaction from "../models/Reaction";
import customError from "../error/customError";

const addReaction = async (req, res) => {
  const { id: userId } = req.user;
  const { postId, commentId, reaction } = req;
  if ((!postId && !commentId) || !reaction) {
    throw new customError("Something went wrong!", StatusCodes.BAD_REQUEST);
  }
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
    comment.save();
  }

  // Create a reaction
  let addedReaction = await Reaction.create({
    reaction,
    user: userId,
    post: postId,
  });
  return res.status(StatusCodes.OK).json({ data: addedReaction });
};

const updateReaction = async (req, res) => {
  const { reactionId, newReaction } = req.body;
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
  return res.status(StatusCodes.OK).json({ data: returnReaction });
};

const deleteReaction = async (req, res) => {
  const { reactionId } = req.body;
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
  return res.status(StatusCodes.OK).json({ data: deletedReaction });
};

const getReactionsByPostId = async (req, res) => {
  const { postId } = req.body;
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

module.exports = {
  addReaction,
  updateReaction,
  deleteReaction,
  getReactionsByPostId,
};
