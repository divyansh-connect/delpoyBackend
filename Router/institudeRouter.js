const express = require("express");
const {
  admFromVadidator,
  stdFeePayValidator,
} = require("../Middleware/validationMW");
const institudeController = require("../Controller/institudeController");
const authMiddleware = require("../Middleware/authMiddleware");
const institudeRouter = express.Router();

institudeRouter.use(authMiddleware);
institudeRouter.get("/students", institudeController.getAllStudents);
institudeRouter.post(
  "/admission",
  admFromVadidator,
  institudeController.postInstitudeAdmForm,
);
institudeRouter.post(
  "/students/fee",
  stdFeePayValidator,
  institudeController.postPayFee,
);
module.exports = institudeRouter;
