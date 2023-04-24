const express = require("express");
const router = express.Router();
const {
  register,
  verify,
  login,
  resentEmail,
  getUserByEmail,
  sendValidationCode,
  validateCode,
  resetPassword,
  getUserInfoByUserEmail,
  updateProfilePicture,
  updateProfileCover,
  updateProfileDetails,
  toggleFriendRequest,
  acceptRequest,
  declineRequest,
  toggleFollow,
  unfriend,
  getFriendsPageData,
  toggleSavePost,
} = require("../controllers/user");
// Middlewares
const authorizationMiddleware = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.post("/verify", authorizationMiddleware, verify);
router.post("/resentEmail", authorizationMiddleware, resentEmail);
router.post("/getUserByEmail", getUserByEmail);
router.post("/sendValidationCode", sendValidationCode);
router.post("/validateCode", validateCode);
router.post("/resetPassword", resetPassword);
router.get(
  "/getUserInfoByUserEmail/:email",
  authorizationMiddleware,
  getUserInfoByUserEmail
);
router.post(
  "/updateProfilePicture",
  authorizationMiddleware,
  updateProfilePicture
);
router.post("/updateProfileCover", authorizationMiddleware, updateProfileCover);
router.patch(
  "/updateProfileDetails",
  authorizationMiddleware,
  updateProfileDetails
);
// Friends, follow
router.patch(
  "/toggleFriendRequest/:id",
  authorizationMiddleware,
  toggleFriendRequest
);
router.patch("/acceptRequest/:id", authorizationMiddleware, acceptRequest);
router.patch("/declineRequest/:id", authorizationMiddleware, declineRequest);
router.patch("/toggleFollow/:id", authorizationMiddleware, toggleFollow);
router.patch("/unfriend/:id", authorizationMiddleware, unfriend);
router.get("/getFriendsPageData", authorizationMiddleware, getFriendsPageData);
router.post("/toggleSavePost/:id", authorizationMiddleware, toggleSavePost);

module.exports = router;
