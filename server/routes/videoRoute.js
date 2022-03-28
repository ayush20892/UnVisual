const express = require("express");
const router = express.Router();
const {
  adminAddVideo,
  getAllVideos,
  getOneVideo,
  updateProduct,
  deleteProduct,
  getAllComments,
  addComment,
  deleteComment,
} = require("../controllers/videoController");
const { isLoggedIn, isRoleAdmissible } = require("../middlewares/user");

// Any user Routes.
router.route("/getAllVideos").get(getAllVideos);
router.route("/getOneVideo/:videoId").get(getOneVideo);

router
  .route("/video/comment")
  .get(isLoggedIn, getAllComments)
  .post(isLoggedIn, addComment)
  .delete(isLoggedIn, deleteComment);

// Admin Routes
router.route("/admin/addProduct").post(isLoggedIn, adminAddVideo);
router
  .route("/admin/product/:id")
  .post(isLoggedIn, isRoleAdmissible("admin"), updateProduct)
  .delete(isLoggedIn, isRoleAdmissible("admin"), deleteProduct);

module.exports = router;
