const joi = require("joi");
exports.createStdValidation = joi.object({
  stdId: joi.string().required(),
  stdName: joi.string().required().trim().replace(/\.+$/, "").uppercase(),
  stdPhone: joi
    .string()
    .required()
    .trim()
    .pattern(/^[0-9]{10}$/),
  stdGender: joi
    .string()
    .trim()
    .required()
    .lowercase()
    .valid("male", "female", "other"),
  stdJoin: joi.date().required(),
  stdAmount: joi.string().lowercase().trim(),
  stdMember: joi
    .string()
    .pattern(/^\d+\s(month|months)\s(paid)$/i)
    .required(),
});

exports.studentAdmValidator = joi.object({
  cId: joi.string().required(),
  cCode: joi.number().required(),
  cName: joi.string().required(),
  cMedium: joi.string().required(),
  admDate: joi.date().required(),
  admSession: joi.string().required(),
  stdName: joi.string().trim().required(),
  stdFathOrHus: joi.string().trim().required(),
  stdMoth: joi.string().allow("").optional(),
  stdDOB: joi.date().required(),
  stdGender: joi.string().valid("Male", "Female", "Other").required(),
  stdCategory: joi.string().required(),
  stdPhone: joi.string().required(),
  stdEmail: joi.string().allow("").optional(),
  stdAadhar: joi.string().required(),
  stdAddresh: joi.string().allow("").optional(),
  stdCity: joi.string().required(),
  stdState: joi.string().required(),
  stdPinCode: joi.number().required(),
  stdPhoto: joi.string().required(),
  stdEnroll: joi.string().allow(null).optional(),
});

exports.announcementValidator = joi.object({
  title: joi.string().trim().required(),
  message: joi.string().trim().required(),
});

exports.stdFeePay = joi.object({
  studentId: joi.string().trim().required(),
  amount: joi.number().min(1).required(),
  feeType: joi.string().trim().required(),
  note: joi.string().trim().allow(""),
  method: joi.string().trim().valid("Cash", "UPI"),
});
