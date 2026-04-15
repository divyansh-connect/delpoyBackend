const express = require("express");
const galleryController = require("../Controller/galleryController");
const galleryRouter = express.Router();

galleryRouter.get("/", galleryController.getGalleryPhotos);

module.exports = galleryRouter;
