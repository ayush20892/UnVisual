const BigPromise = require("../middlewares/bigPromise");
const Video = require("../models/videoModel");
const WhereClause = require("../utils/whereClause");
const { extend } = require("lodash");

exports.getAllVideos = BigPromise(async (req, res) => {
  const videos = new WhereClause(
    Video.find().populate("comments.user"),
    req.query
  )
    .search()
    .filter()
    .pager();

  const videoResult = await videos.base;

  res.status(200).json({
    success: true,
    videoResult,
  });
});

exports.getOneVideo = BigPromise(async (req, res) => {
  const video = await Video.findById(req.params.id);

  res.status(200).json({
    success: true,
    video,
  });
});

exports.getAllComments = BigPromise(async (req, res) => {
  const video = await Video.findById(req.body.videoId).populate(
    "comments.user"
  );

  res.status(200).json({
    success: true,
    comments: video.comments,
  });
});

exports.addComment = BigPromise(async (req, res) => {
  const user = req.user;

  const { comment, videoId } = req.body;

  const video = await Video.findById(videoId).populate("comments.user");

  video.comments.push({ user: user._id, comment });

  await video.save();
  const newComment = video.comments[video.comments.length - 1];
  newComment.user = user;

  res.status(200).json({
    success: true,
    video,
    user,
    newComment,
  });
});

exports.deleteComment = BigPromise(async (req, res) => {
  const user = req.user;

  const { commentId, videoId } = req.body;

  const video = await Video.findById(videoId);

  const newComment = video.comments.filter(
    (comm) => comm._id.toString() !== commentId
  );

  await video.updateOne({ comments: newComment });

  res.status(200).json({
    success: true,
    video,
  });
});

// Admin Controllers
exports.adminAddVideo = BigPromise(async (req, res, next) => {
  req.body.user = req.user;

  const video = await Video.create(req.body);

  res.status(201).json({
    success: true,
    video,
  });
});

exports.updateProduct = BigPromise(async (req, res, next) => {
  const product = await Video.findById(req.params.id);

  let imageArray = [];

  if (req.files) {
    for (let index = 0; index < product.photos.length; index++) {
      await cloudinary.uploader.destroy(product.photos[index].id);
    }

    for (let index = 0; index < req.files.photos.length; index++) {
      const result = await cloudinary.uploader.upload(
        req.files.photos[index].tempFilePath,
        {
          folder: "products",
        }
      );

      imageArray.push({
        id: result.public_id,
        secure_url: result.secure_url,
      });
    }
    req.body.photos = imageArray;
  }

  const updatedProduct = extend(product, req.body);

  await product.save();

  res.status(200).json({
    success: true,
    updatedProduct,
  });
});

exports.deleteProduct = BigPromise(async (req, res, next) => {
  const product = await Video.findById(req.params.id);

  for (let index = 0; index < product.photos.length; index++) {
    await cloudinary.uploader.destroy(product.photos[index].id);
  }

  await product.remove();

  res.status(200).json({
    success: true,
    product,
    message: "Video Deleted succesfully",
  });
});
