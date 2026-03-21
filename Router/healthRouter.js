const express = require("express");
const healthRouter = express.Router();

healthRouter.get("/", (req, res, next) => {
  try {
    res.status(200).json({
      status: "OK",
      message: "Server is running",
    });
  } catch (error) {
    next(error);
  }
});
module.exports = healthRouter;
