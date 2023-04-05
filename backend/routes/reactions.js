const express = require("express");
const route = express.Router();
// Controllers
const {
  handleReactionPost,
  handleReactionComment,
  getReactionsByPostId,
  getReactionsByCommentId,
  getReactionByPostIdAndUserId,
  getReactionByCommentIdAndUserId,
} = require("../controllers/reactions");
// Middlewares
const authorizationMiddleware = require("../middleware/auth");

route.post(
  "/handleReactionPost/:postId",
  authorizationMiddleware,
  handleReactionPost
);
route.post(
  "/handleReactionComment/:commentId",
  authorizationMiddleware,
  handleReactionComment
);
route.get(
  "/getReactionsByPostId/:postId",
  authorizationMiddleware,
  getReactionsByPostId
);
route.get(
  "/getReactionsByCommentId/:commentId",
  authorizationMiddleware,
  getReactionsByCommentId
);
route.get(
  "/getReactionByPostIdAndUserId/:postId",
  authorizationMiddleware,
  getReactionByPostIdAndUserId
);
route.get(
  "/getReactionByCommentIdAndUserId/:commentId",
  authorizationMiddleware,
  getReactionByCommentIdAndUserId
);

module.exports = route;
