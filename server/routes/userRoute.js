const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  logout,
  forgotPassword,
  verifyForgotCode,
  passwordReset,
  userDashboard,
  updatePassword,
  updateUser,
  getAllLikedVideos,
  addToLikedVideos,
  deleteFromLikedVideos,
  getAllWatchLater,
  addToWatchLater,
  deleteFromWatchLater,
  getAllHistory,
  addToHistory,
  deleteFromHistory,
  clearAllHistory,
  getAllPlaylist,
  createPlaylist,
  deletePlaylist,
  getAllSinglePlaylist,
  addToSinglePlaylist,
  deleteFromSinglePlaylist,
  adminUsers,
  adminGetUser,
  adminUpdateUser,
  adminDeleteUser,
} = require("../controllers/userController");

const {
  isLoggedIn,
  isUserVerified,
  isRoleAdmissible,
} = require("../middlewares/user");

// Login Routes
router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").get(logout);

// Forgot Password Routes
router.route("/forgotPassword").post(forgotPassword);
router.route("/verifyCode").post(verifyForgotCode);
router.route("/password/reset").post(isUserVerified, passwordReset);

// Logged In user routes
router.route("/userdashboard").get(isLoggedIn, userDashboard);
router.route("/password/update").post(isLoggedIn, updatePassword);
router.route("/user/update").post(isLoggedIn, updateUser);

// Liked Videos Routes
router
  .route("/user/likedVideos")
  .get(isLoggedIn, getAllLikedVideos)
  .post(isLoggedIn, addToLikedVideos)
  .delete(isLoggedIn, deleteFromLikedVideos);

// Watch Later Routes
router
  .route("/user/watchLater")
  .get(isLoggedIn, getAllWatchLater)
  .post(isLoggedIn, addToWatchLater)
  .delete(isLoggedIn, deleteFromWatchLater);

// History Routes
router
  .route("/user/history")
  .get(isLoggedIn, getAllHistory)
  .post(isLoggedIn, addToHistory)
  .delete(isLoggedIn, deleteFromHistory);
router.route("/user/clearHistory").delete(isLoggedIn, clearAllHistory);

// Playlist Routes
router
  .route("/user/playlist")
  .get(isLoggedIn, getAllPlaylist)
  .post(isLoggedIn, createPlaylist)
  .delete(isLoggedIn, deletePlaylist);

// Single Playlist Routes
router
  .route("/user/singlePlaylist")
  .get(isLoggedIn, getAllSinglePlaylist)
  .post(isLoggedIn, addToSinglePlaylist)
  .delete(isLoggedIn, deleteFromSinglePlaylist);

// Admin Routes
router
  .route("/admin/users")
  .get(isLoggedIn, isRoleAdmissible("admin"), adminUsers);

router
  .route("/admin/user/:id")
  .get(isLoggedIn, isRoleAdmissible("admin"), adminGetUser)
  .put(isLoggedIn, isRoleAdmissible("admin"), adminUpdateUser)
  .delete(isLoggedIn, isRoleAdmissible("admin"), adminDeleteUser);

module.exports = router;
