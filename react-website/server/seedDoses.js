require("dotenv").config();
const mongoose = require("mongoose");
const MissedDose = require("./models/MissedDose");
const TakenDose = require("./models/TakenDose");

// ================================
// MISSED DOSE TEST DATA
// ================================

const testMissedDoses = [
  {
    medicine: "Amlodipine",
    dosage: "5 mg",
    scheduledDate: "2026-09-15",
    scheduledTime: "08:00",
  },
  {
    medicine: "Aspirin",
    dosage: "75 mg",
    scheduledDate: "2026-09-14",
    scheduledTime: "21:00",
  },
  {
    medicine: "Metformin",
    dosage: "500 mg",
    scheduledDate: "2026-09-17",
    scheduledTime: "08:00",
  },
  {
    medicine: "Vitamin D3",
    dosage: "1,000 IU",
    scheduledDate: "2026-09-16",
    scheduledTime: "21:00",
  },
];

// ================================
// TAKEN DOSE TEST DATA
// ================================

const testTakenDoses = [
  {
    medicine: "Paracetamol",
    dosage: "650 mg",
    scheduledDate: "2026-09-14",
    scheduledTime: "08:00",
    takenTime: "08:05",
  },
  {
    medicine: "Amlodipine",
    dosage: "5 mg",
    scheduledDate: "2026-09-14",
    scheduledTime: "21:00",
    takenTime: "21:03",
  },
  {
    medicine: "Metformin",
    dosage: "500 mg",
    scheduledDate: "2026-09-15",
    scheduledTime: "08:00",
    takenTime: "08:12",
  },
  {
    medicine: "Vitamin D3",
    dosage: "1,000 IU",
    scheduledDate: "2026-09-15",
    scheduledTime: "21:00",
    takenTime: "21:01",
  },
];

// ================================
// SEED DATA
// ================================

async function seedDoses() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Clear old test missed doses
    await MissedDose.deleteMany({
      scheduledDate: {
        $gte: "2026-08-31",
        $lte: "2026-09-30",
      },
    });

    // Clear old test taken doses
    await TakenDose.deleteMany({
      scheduledDate: {
        $gte: "2026-08-31",
        $lte: "2026-09-30",
      },
    });

    // Insert missed doses
    await MissedDose.insertMany(testMissedDoses);

    // Insert taken doses
    await TakenDose.insertMany(testTakenDoses);

    console.log(
      `Inserted ${testMissedDoses.length} missed-dose test records.`
    );

    console.log(
      `Inserted ${testTakenDoses.length} taken-dose test records.`
    );
  } catch (error) {
    console.error("Unable to seed doses:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedDoses();