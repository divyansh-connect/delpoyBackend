const express = require("express");
const authMiddleware = require("../Middleware/authMiddleware");
const stdyMatarialController = require("../Controller/stdyMatarialController");

const stdyMatarialRouter = express.Router();

stdyMatarialRouter.get("/dca", stdyMatarialController.getDCAStdyMatarial);
stdyMatarialRouter.get("/pgdca", stdyMatarialController.getPGDCAStdyMatarial);
stdyMatarialRouter.get(
  "/",
  authMiddleware,
  stdyMatarialController.getAllStdyMatarial,
);

module.exports = stdyMatarialRouter;
