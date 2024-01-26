const {HttpError} = require("../helpers/index");

const isEmptyBody = (req,res,next) => {
  const {length} = Object.keys(req.body);
  if(!length) {
    return next(HttpError(400,'The data is not valid!'))
  }
  next();
}

module.exports = {isEmptyBody}