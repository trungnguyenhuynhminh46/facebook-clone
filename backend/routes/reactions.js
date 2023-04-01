const express = require("express");
const route = express.Router();
// Controllers
const {
  addReaction,
  updateReaction,
  deleteReaction,
  getReactionsByPostId,
  getReactionByPostIdAndUserId,
} = require("../controllers/reactions");
// Middlewares
const authorizationMiddleware = require("../middleware/auth");

route.get("/", (req, res) => {
  return res.status(200).json({
    message: "Hello world",
  });
});

route.get(
  "/getReactionsByPostId/:postId",
  authorizationMiddleware,
  getReactionsByPostId
);
route.get(
  "/getReactionByPostIdAndUserId/:postId",
  authorizationMiddleware,
  getReactionByPostIdAndUserId
);
route.post("/", authorizationMiddleware, addReaction);
route.patch("/:reactionId", authorizationMiddleware, updateReaction);
route.delete("/:reactionId", authorizationMiddleware, deleteReaction);

module.exports = route;
