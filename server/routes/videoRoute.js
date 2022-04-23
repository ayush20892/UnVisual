const express = require("express");
const router = express.Router();
const {
  adminAddVideo,
  getAllVideos,
  addComment,
  deleteComment,
} = require("../controllers/videoController");
const { isLoggedIn } = require("../middlewares/user");

// Video Routes.
router.route("/getAllVideos").get(getAllVideos);

router
  .route("/video/comment")
  .post(isLoggedIn, addComment)
  .delete(isLoggedIn, deleteComment);

// Admin Routes
router.route("/admin/addProduct").post(isLoggedIn, adminAddVideo);

module.exports = router;
