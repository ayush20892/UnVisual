const mongoose = require("mongoose");

const videoSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title of the Video Required."],
    trim: true,
    maxLength: [70, "Video Title should not be more than 50 character,"],
  },
  creator: {
    type: String,
    required: [true, "Name of the Video Creator Required."],
    maxLength: [30, "Creator name should not be more than 30 character,"],
  },
  videoId: {
    type: String,
    required: [true, "VideoId of the video Required."],
  },
  image: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  views: {
    type: Number,
    required: true,
    default: 0,
  },
  likes: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    required: [true, "Category of the Video Required."],
    enum: {
      values: [
        "All",
        "Comedy",
        "Javascript",
        "ComputerScience",
        "Music",
        "Education",
        "Finance",
        "Web3.0",
        "Cryptocurrency",
      ],
      message: "Please select the category",
    },
  },
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Video", videoSchema);
