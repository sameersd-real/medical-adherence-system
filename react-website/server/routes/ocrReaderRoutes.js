const express = require("express");
const multer = require("multer");
const path = require("path");
const { execFile } = require("child_process");

const router = express.Router();

const upload = multer({
    dest: path.join(__dirname, "../uploads/")
});

router.post("/", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            message: "No image uploaded"
        });
    }

    const imagePath = path.resolve(req.file.path);

    execFile(
    "node",
    [
        path.join(__dirname, "../../chatgpt-test/test.js"),
        imagePath
    ],
    {
        maxBuffer: 1024 * 1024 * 10
    },
    (error, stdout, stderr) => {

        console.log("===== PLAYWRIGHT STDOUT =====");
        console.log(stdout);

        console.log("===== PLAYWRIGHT STDERR =====");
        console.log(stderr);

        console.log("===== PLAYWRIGHT ERROR =====");
        console.log(error);

        if (error) {
            return res.status(500).json({
                message: "OCR processing failed",
                error: error.message,
                stderr
            });
        }

        try {
            const result = JSON.parse(stdout);
            res.json(result);
        } catch (err) {
            console.error("JSON PARSE ERROR:", err);

            res.status(500).json({
                message: "Invalid OCR result",
                output: stdout
            });
        }
    }
);
});

module.exports = router;