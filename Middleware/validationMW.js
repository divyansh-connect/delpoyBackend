const {
  createStdValidation,
  studentAdmValidator,
  announcementValidator,
  stdFeePay,
} = require("../validators/joiValidators");

exports.validateStudent = (req, res, next) => {
  const { error, value } = createStdValidation.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  req.body = value;
  next();
};

exports.admFromVadidator = (req, res, next) => {
  const { error, value } = studentAdmValidator.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  req.body = value;
  next();
};

exports.checkAnnouncementValidator = (req, res, next) => {
  const { error, value } = announcementValidator.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  req.body = value;
  next();
};

exports.stdFeePayValidator = (req, res, next) => {
  const { error, value } = stdFeePay.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }
  req.body = value;
  next();
};
