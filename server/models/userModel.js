const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, "Please enter a name."],
    maxLength: [30, "Name should be under 30 char."],
  },
  email: {
    type: String,
    require: [true, "Please enter an email."],
    validate: [validator.isEmail, "Please enter a valid email format."],
    unique: true,
  },
  password: {
    type: String,
    require: [true, "Please enter a password."],
    minLength: [6, "Password should be atleast 6 char"],
    select: false,
  },
  role: {
    type: String,
    default: "user",
  },
  forgotPasswordCode: String,
  forgotPasswordExpiry: Date,
  likedVideos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
      required: true,
    },
  ],
  watchLater: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
      required: true,
    },
  ],
  history: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
      required: true,
    },
  ],
  playlists: [
    {
      playlistName: {
        type: String,
        required: true,
      },
      playlistVideos: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Video",
          required: true,
        },
      ],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.isPasswordValidated = async function (userSentPassword) {
  return await bcrypt.compare(userSentPassword, this.password);
};

userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_expiresIn,
  });
};

userSchema.methods.getForgotPasswordCode = function () {
  const forgotCode = crypto.randomBytes(3).toString("hex");

  this.forgotPasswordCode = crypto
    .createHash("sha256")
    .update(forgotCode)
    .digest("hex");

  this.forgotPasswordExpiry = Date.now() + 20 * 60 * 100;

  return forgotCode;
};

module.exports = mongoose.model("User", userSchema);
