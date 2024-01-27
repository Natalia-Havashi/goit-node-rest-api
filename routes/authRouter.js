const express = require('express');
const {signup,signin,getCurrent,logout} = require('../controllers/authController')
const {validateBody, isEmptyBody,authenticate} = require('../middlewares/index')
const {userSigninSchema,userSignupSchema} = require('../models/User')

const authRouter = express.Router();


authRouter.post("/register",isEmptyBody,validateBody(userSignupSchema), signup)
authRouter.post("/login", isEmptyBody,validateBody(userSigninSchema), signin)
authRouter.get("/current",authenticate, getCurrent)
authRouter.post("/logout", authenticate, logout)



module.exports = authRouter;