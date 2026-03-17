// External Module
const express = require("express");

// Local Module
const libraryController = require("../Controller/libraryController");
const { validateStudent } = require("../Middleware/validationMW");
const authMiddleware = require("../Middleware/authMiddleware");

const libaryRouter = express.Router();

libaryRouter.use(authMiddleware);
libaryRouter.get("/seats", libraryController.getSeats);
libaryRouter.post(
  "/seats/addstudent",
  validateStudent,
  libraryController.postAddStudent,
);
libaryRouter.get("/lists", libraryController.getStudentLists);
libaryRouter.get("/student/:stdId", libraryController.getStudent);
libaryRouter.put("/student/edit/:stdId", libraryController.putStudentEdit);
libaryRouter.put("/student/pay/:stdId", libraryController.putStudentPay);
libaryRouter.delete("/student/delete/:stdId", libraryController.deleteStudent);

module.exports = libaryRouter;
