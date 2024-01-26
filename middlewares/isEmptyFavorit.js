const {HttpError} = require("../helpers/HttpError");

const isEmptyFavorit = (req,res,next) => {
    const {length} = Object.keys(req.body);
    if(!length) {
        return next(HttpError(400, "Missing field favorite"))
    }
    next();
};

module.exports = {isEmptyFavorit}