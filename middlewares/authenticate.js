const jwt = require("jsonwebtoken");
require("dotenv").config();

const { HttpError } = require("../helpers/index");

const {User} = require("../models/User.js");

const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(HttpError(401, "Not authorized"));
  }
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    return next(HttpError(401));
  }
  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    if (!user || !user.token || token !== user.token) {
      return next(HttpError(401));
    }
    req.user = user;
    next();
  } catch (error) { 
    next(HttpError(401, error.message));
  }
};

module.exports = { authenticate };
