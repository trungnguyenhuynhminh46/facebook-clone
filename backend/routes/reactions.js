const express = require("express");
const route = express.Router();
// Controllers
const {
  handleReactionPost,
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

route.post(
  "/handleReactionPost/:postId",
  authorizationMiddleware,
  handleReactionPost
);
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

module.exports = route;
