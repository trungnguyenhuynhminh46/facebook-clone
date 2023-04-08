const express = require("express");
const route = express.Router();
// Controllers
const {
  getRootCommentsByPostId,
  getCommentsByParentComment,
  getCommentByCommentId,
  addComment,
  updateComment,
  deleteComment,
  commentsDetailByPostId,
} = require("../controllers/comments");
// Middlewares
const authorizationMiddleware = require("../middleware/auth");
// Get root comments
route.get("/root/:postId", authorizationMiddleware, getRootCommentsByPostId);
// Get children comments
route.get(
  "/children/:commentId",
  authorizationMiddleware,
  getCommentsByParentComment
);
// Get comments detail by post id
route.get(
  "/commentsDetailByPostId/:postId",
  authorizationMiddleware,
  commentsDetailByPostId
);
// Get comment by commentId
route.get("/:commentId", authorizationMiddleware, getCommentByCommentId);
// Add a comment
route.post("/", authorizationMiddleware, addComment);
// Update a comment
route.patch("/:commentId", authorizationMiddleware, updateComment);
// Delete a comment
route.delete("/:commentId", authorizationMiddleware, deleteComment);

module.exports = route;
