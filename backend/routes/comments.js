const express = require("express");
const route = express.Router();
// Controllers
const {
  getRootCommentsByPostId,
  getCommentsByParentComment,
  addComment,
  updateComment,
  deleteComment,
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
// Add a comment
route.post("/", authorizationMiddleware, addComment);
// Update a comment
route.patch("/:commentId", authorizationMiddleware, updateComment);
// Delete a comment
route.delete("/:commentId", authorizationMiddleware, deleteComment);

module.exports = route;
