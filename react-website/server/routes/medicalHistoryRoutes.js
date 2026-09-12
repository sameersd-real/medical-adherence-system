const express = require("express");
const MedicalHistory = require("../models/MedicalHistory");

const router = express.Router();


// ================================
// GET MEDICAL HISTORY
// ================================

router.get("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        let medicalHistory = await MedicalHistory.findOne({ userId });

        // Create an empty record if the user doesn't have one yet
        if (!medicalHistory) {
            medicalHistory = await MedicalHistory.create({
                userId
            });
        }

        res.json(medicalHistory);

    } catch (error) {
        console.error("Get medical history error:", error);

        res.status(500).json({
            message: "Failed to get medical history."
        });
    }
});


// ================================
// UPDATE MEDICAL HISTORY
// ================================

router.put("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        const {
            dateOfBirth,
            gender,
            bloodGroup,
            height,
            weight,
            emergencyContact,
            emergencyContactName,
            allergies,
            chronicConditions,
            currentMedications,
            treatmentHistory
        } = req.body;

        const medicalHistory = await MedicalHistory.findOneAndUpdate(
            { userId },
            {
                userId,
                dateOfBirth,
                gender,
                bloodGroup,
                height: height ? Number(height) : undefined,
                weight: weight ? Number(weight) : undefined,
                emergencyContact,
                emergencyContactName,
                allergies: allergies || [],
                chronicConditions: chronicConditions || [],
                currentMedications: currentMedications || [],
                treatmentHistory: treatmentHistory || []
            },
            {
                new: true,
                upsert: true,
                runValidators: true
            }
        );

        res.json(medicalHistory);

    } catch (error) {
        console.error("Save medical history error:", error);

        res.status(500).json({
            message: "Failed to save medical history."
        });
    }
});


module.exports = router;