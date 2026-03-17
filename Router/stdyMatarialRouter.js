const express = require("express");
const stdyMatarialController = require("../Controller/stdyMatarialController");
const stdyMatarialRouter = express.Router();
stdyMatarialRouter.post("/", stdyMatarialController.postUpload);

module.exports = stdyMatarialRouter;
