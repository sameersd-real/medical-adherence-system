import { useRef, useState } from "react";
import "./OCR.css";

export default function OCR() {
    const fileInputRef = useRef(null);

    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");

    const handleChooseImage = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event) => {
        const file = event.target.files?.[0];

        if (!file) return;

        setSelectedFile(file);
        setResult(null);
        setError("");
        setLoading(true);

        try {
            const formData = new FormData();

            formData.append("image", file);
                    
            const response = await fetch(
                "http://localhost:5000/api/ocr-reader",
                {
                    method: "POST",
                    body: formData
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "OCR failed"
                );
            }

            setResult(data);

        } catch (error) {
            console.error(error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="ocr-page">

            <div className="ocr-header">
                <div>
                    <p className="ocr-eyebrow">
                        MEDICATION ASSISTANT
                    </p>

                    <h1>Scan Your Prescription</h1>

                    <p className="ocr-subtitle">
                        Upload a prescription or medicine label and let
                        MedAdhere extract the medication details for you.
                    </p>
                </div>

                <div className="ocr-status">
                    <span className="status-dot"></span>

                    {loading ? "Scanning..." : "OCR Ready"}
                </div>
            </div>

            <div className="ocr-content">

                <section className="ocr-upload-card">

                    <div className="upload-icon">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.6"
                        >
                            <path d="M12 16V4" />
                            <path d="M7 9l5-5 5 5" />
                            <path d="M5 20h14" />
                        </svg>
                    </div>

                    <h2>Upload an image</h2>

                    <p>
                        Drag and drop your prescription here, or browse
                        your device.
                    </p>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        onChange={handleFileChange}
                        hidden
                    />

                    <button
                        className="upload-button"
                        onClick={handleChooseImage}
                        disabled={loading}
                    >
                        {loading ? "Scanning..." : "Choose Image"}
                    </button>

                    <span className="upload-hint">
                        JPG, PNG or WEBP · Max 10 MB
                    </span>

                    {selectedFile && (
                        <p>
                            Selected: {selectedFile.name}
                        </p>
                    )}

                </section>

                <div className="ocr-divider">
                    <span>OR</span>
                </div>

                <section className="camera-card">

                    <div className="camera-content">

                        <div className="camera-icon">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.6"
                            >
                                <path d="M4 7h3l2-2h6l2 2h3v12H4V7Z" />
                                <circle cx="12" cy="13" r="3.5" />
                            </svg>
                        </div>

                        <div>
                            <h3>Take a photo</h3>

                            <p>
                                Use your camera to scan a prescription
                                directly.
                            </p>
                        </div>

                    </div>

                    <button className="camera-button">
                        Open Camera
                    </button>

                </section>

            </div>

            {loading && (
                <section className="ocr-result">
                    <h2>Analyzing prescription...</h2>
                    <p>
                        Please wait while the prescription is being processed.
                    </p>
                </section>
            )}

            {error && (
                <section className="ocr-result">
                    <h2>OCR Error</h2>
                    <p>{error}</p>
                </section>
            )}

            {result?.medicines && (
                <section className="ocr-result">

                    <h2>Extracted Medicines</h2>

                    {result.medicines.length === 0 ? (
                        <p>No medicines could be identified.</p>
                    ) : (
                        result.medicines.map((medicine, index) => (
                            <div
                                className="medicine-result"
                                key={index}
                            >
                                <h3>
                                    {medicine.name || "Unknown medicine"}
                                </h3>

                                <p>
                                    <strong>Strength:</strong>{" "}
                                    {medicine.strength}
                                </p>

                                <p>
                                    <strong>Quantity:</strong>{" "}
                                    {medicine.quantity}
                                </p>

                                <p>
                                    <strong>Frequency:</strong>{" "}
                                    {medicine.frequency}
                                </p>

                                <p>
                                    <strong>Timing:</strong>{" "}
                                    {medicine.timing}
                                </p>

                                <p>
                                    <strong>Instructions:</strong>{" "}
                                    {medicine.instructions}
                                </p>
                            </div>
                        ))
                    )}

                </section>
            )}

            <section className="ocr-info">

                <div className="info-item">
                    <div className="info-number">01</div>

                    <div>
                        <h3>Upload</h3>
                        <p>Add a clear image of your prescription.</p>
                    </div>
                </div>

                <div className="info-line"></div>

                <div className="info-item">
                    <div className="info-number">02</div>

                    <div>
                        <h3>Scan</h3>
                        <p>
                            MedAdhere identifies the medicine details.
                        </p>
                    </div>
                </div>

                <div className="info-line"></div>

                <div className="info-item">
                    <div className="info-number">03</div>

                    <div>
                        <h3>Review</h3>
                        <p>
                            Check the extracted information before saving.
                        </p>
                    </div>
                </div>

            </section>

        </div>
    );
}