const mongoose = require("mongoose");

const alarmSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    medicine: {
        type: String,
        trim: true
    },
    time: {
        type: String,
        required: true
    },
    tablets: {
        type: Number,
        required: true,
        min: 1
    },
    enabled: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model("Alarm", alarmSchema);