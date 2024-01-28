const { isEmptyBody } = require("./isEmptyBody");
const { validateBody } = require("./validateBody");
const { isValidId } = require("./isValidId");
const { isEmptyFavorit } = require("./isEmptyFavorit");
const { authenticate } = require("./authenticate");
const { upload } = require("./upload");

module.exports = {
  isEmptyBody,
  validateBody,
  isValidId,
  isEmptyFavorit,
  authenticate,
  upload,
};
