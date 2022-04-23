const BigPromise = require("../middlewares/bigPromise");
const Video = require("../models/videoModel");
const WhereClause = require("../utils/whereClause");
const shuffleArray = require("../utils/shuffleVideos");
const { extend } = require("lodash");

exports.getAllVideos = BigPromise(async (req, res) => {
  const videosWithClause = new WhereClause(
    Video.find().populate("comments.user"),
    req.query
  )
    .search()
    .filter()
    .pager();

  const videos = await videosWithClause.base;
  const videoResult = shuffleArray(videos);

  res.status(200).json({
    success: true,
    videoResult,
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
