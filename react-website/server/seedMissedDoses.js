require("dotenv").config();
const mongoose = require("mongoose");
const MissedDose = require("./models/MissedDose");

const testMissedDoses = [
  { medicine: "Amlodipine", dosage: "5 mg", scheduledDate: "2026-08-31", scheduledTime: "08:00" },
  { medicine: "Aspirin", dosage: "75 mg", scheduledDate: "2026-08-31", scheduledTime: "21:00" },
  { medicine: "Metformin", dosage: "500 mg", scheduledDate: "2026-09-02", scheduledTime: "08:00" },
  { medicine: "Vitamin D3", dosage: "1,000 IU", scheduledDate: "2026-09-06", scheduledTime: "21:00" },
];

async function seedMissedDoses() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await MissedDose.deleteMany({
      scheduledDate: { $gte: "2026-08-31", $lte: "2026-09-06" },
    });
    await MissedDose.insertMany(testMissedDoses);
    console.log(`Inserted ${testMissedDoses.length} missed-dose test records.`);
  } finally {
    await mongoose.disconnect();
  }
}

seedMissedDoses().catch((error) => {
  console.error("Unable to seed missed doses:", error);
  process.exitCode = 1;
});
