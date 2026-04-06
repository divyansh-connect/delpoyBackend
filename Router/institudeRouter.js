const express = require("express");
const {
  admFromVadidator,
  stdFeePayValidator,
} = require("../Middleware/validationMW");
const institudeController = require("../Controller/institudeController");
const authMiddleware = require("../Middleware/authMiddleware");
const institudeRouter = express.Router();

institudeRouter.use(authMiddleware);
institudeRouter.get(
  "/studentsandpay",
  institudeController.getAllStudentsAndPay,
);
institudeRouter.get("/student/:sid", institudeController.getStudentbyID);
institudeRouter.get("/payments/:sid", institudeController.getAllPaymentbyID);
institudeRouter.get("/documents/:sid", institudeController.getAllDocumentbyID);

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

institudeRouter.put("/documents/:sid", institudeController.putMarkbyID);
module.exports = institudeRouter;
