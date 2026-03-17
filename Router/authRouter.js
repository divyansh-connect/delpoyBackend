const express = require("express");
const authController = require("../Controller/authController");
const authMiddleware = require("../Middleware/authMiddleware");
const authRouter = express.Router();

authRouter.get("/verify", authMiddleware, authController.getVerify);
authRouter.post("/login", authController.postLogin);
authRouter.post("/register", authController.postSignUp);

module.exports = authRouter;
