const express = require("express");
const announcementController = require("../Controller/announcementController");
const authMiddleware = require("../Middleware/authMiddleware");
const { checkAnnouncementValidator } = require("../Middleware/validationMW");

const announcementRouter = express.Router();

// Public Routes
announcementRouter.get("/", announcementController.getAnnouncementList);

// Admin Routes
announcementRouter.use(authMiddleware);
announcementRouter.post(
  "/",
  checkAnnouncementValidator,
  announcementController.postAnnouncementAdd,
);
announcementRouter.delete("/:id", announcementController.deleteAnnouncement);
module.exports = announcementRouter;
