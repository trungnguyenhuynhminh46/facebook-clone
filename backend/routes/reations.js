const express = require("express");
const route = express.Router();
// Controllers
const {
  addReaction,
  updateReaction,
  deleteReaction,
  getReactionsByPostId,
} = require("../controllers/reactions");
// Middlewares
const authorizationMiddleware = require("../middleware/auth");

route.get(
  "/getReactionsByPostId",
  authorizationMiddleware,
  getReactionsByPostId
);
route.post("/addReaction", authorizationMiddleware, addReaction);
route.patch("/updateReaction", authorizationMiddleware, updateReaction);
route.delete("deleteReaction", authorizationMiddleware, deleteReaction);

module.exports = route;
