const mongoose = require("mongoose");

const treatmentSchema = new mongoose.Schema(
    {
        diagnosis: {
            type: String,
            trim: true
        },
        treatment: {
            type: String,
            trim: true
        },
        doctor: {
            type: String,
            trim: true
        },
        hospital: {
            type: String,
            trim: true
        },
        startDate: {
            type: String
        },
        endDate: {
            type: String
        },
        notes: {
            type: String,
            trim: true
        }
    },
    { _id: false }
);

const medicalHistorySchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },

        dateOfBirth: {
            type: String
        },

        gender: {
            type: String
        },

        bloodGroup: {
            type: String
        },

        height: {
            type: Number
        },

        weight: {
            type: Number
        },

        emergencyContact: {
            type: String
        },

        emergencyContactName: {
            type: String
        },

        allergies: {
            type: [String],
            default: []
        },

        chronicConditions: {
            type: [String],
            default: []
        },

        currentMedications: {
            type: [String],
            default: []
        },

        treatmentHistory: {
            type: [treatmentSchema],
            default: []
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("MedicalHistory", medicalHistorySchema);