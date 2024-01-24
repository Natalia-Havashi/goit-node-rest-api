const HttpError = require("./index");

const validateBody = (req,res,next) => {
  const {length} = Object.keys(req.body);
  if(!length) {
    return next(HttpError(400,'The data is not valid!'))
  }
  next();
}

module.exports = validateBody;
