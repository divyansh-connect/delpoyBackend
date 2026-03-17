// External Module
const express = require("express");
// Local Module

const courseController = require("../Controller/courseController");
const authMiddleware = require("../Middleware/authMiddleware");

const courseRouter = express.Router();
courseRouter.use(authMiddleware);
courseRouter.get("/", courseController.getCourse);
courseRouter.post("/addcourse", courseController.postCourse);

module.exports = courseRouter;
