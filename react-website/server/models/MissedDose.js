const mongoose = require("mongoose");

const missedDoseSchema = new mongoose.Schema(
  {
    medicine: { type: String, required: true, trim: true },
    dosage: { type: String, required: true, trim: true },
    scheduledDate: {
      type: String,
      required: true,
      match: /^\d{4}-\d{2}-\d{2}$/,
      index: true,
    },
    scheduledTime: {
      type: String,
      required: true,
      match: /^\d{2}:\d{2}$/,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MissedDose", missedDoseSchema);
