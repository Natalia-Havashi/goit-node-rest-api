const express = require('express');
const {signup,signin,getCurrent,logout,avatarUpdate} = require('../controllers/authController');
const {validateBody, isEmptyBody,authenticate,upload} = require('../middlewares/index');
const {userSigninSchema,userSignupSchema} = require('../models/User');

const authRouter = express.Router();


authRouter.post("/register",isEmptyBody,validateBody(userSignupSchema), signup);
authRouter.post("/login", isEmptyBody,validateBody(userSigninSchema), signin);
authRouter.get("/current",authenticate, getCurrent);
authRouter.post("/logout", authenticate, logout);
authRouter.patch("/avatars",upload.single("avatarURL"),authenticate,avatarUpdate);



module.exports = authRouter;