const mongoose = require("mongoose");
const paymentSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "InstitudeStudents",
      required: true,
      index: true,
    },
    amount: { type: Number, required: true },
    feeType: { type: String, required: true },
    note: { type: String, default: "" },
    paymentMethod: { type: String, enum: ["Cash", "UPI"], default: "Cash" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Payments", paymentSchema);
