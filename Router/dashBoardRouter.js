const express = require("express");
const dashBoardController = require("../Controller/dashBoardController");
const authMiddleware = require("../Middleware/authMiddleware");
const dashBoardRouter = express.Router();

dashBoardRouter.use(authMiddleware);
dashBoardRouter.get("/course", dashBoardController.getDashboardsCourse);
dashBoardRouter.get("/payments", dashBoardController.getDashboardspayment);

module.exports = dashBoardRouter;
