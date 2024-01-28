const fs = require("fs/promises");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const gravatar = require("gravatar");
const { User } = require("../models/User");
const { HttpError, ctrlWrapper } = require("../helpers/index");
const Jimp = require("jimp");
const { JWT_SECRET } = process.env;

const avatarPath = path.join(__dirname, "../public/avatars");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL: newUser.avatarURL,
    },
  });
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const { _id: id } = user;
  const payload = {
    id,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  await User.findByIdAndUpdate(id, { token });
  res.json({
    token,
    user: {
      email,
      subscription: user.subscription,
    },
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json();
};

const avatarUpdate = async (req, res) => {
  const { _id } = req.user;
  if (!req.file) {
    throw HttpError(400);
  }
  const { path: oldPath, filename } = req.file;
  const newPath = path.join(avatarPath, filename);
  await fs.rename(oldPath, newPath);

  Jimp.read(newPath)
    .then((filename) => {
      return filename
        .resize(250, 250) // resize
        .write(newPath); // save
    })
    .catch((err) => {
      console.error(err);
    });

  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });
  res.json({ avatarURL });
};

module.exports = {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  avatarUpdate: ctrlWrapper(avatarUpdate),
};
