const mongoose = require("mongoose");

const alarmSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    index: {
        type: Number,
        required: true,
        min: 0,
        max: 2
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
// One alarm slot per user
alarmSchema.index(
    { userId: 1, index: 1 },
    { unique: true }
);

module.exports = mongoose.model("Alarm", alarmSchema);