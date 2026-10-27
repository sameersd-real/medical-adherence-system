
import { useState } from "react";

const API_BASE = "http://localhost:3000/api/device";
const DEVICE_ID = "ESP32_001";
const USER_ID = "6ad707ca8c8363dd1e07e13b";

export default function Refill() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState("");
  const [refillActive, setRefillActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendRefillRequest = async (action) => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        `${API_BASE}/refill/${action}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            deviceId: DEVICE_ID,
            userId: USER_ID,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Request failed."
        );
      }

      if (action === "start") {
        setRefillActive(true);
        setMessage(
          "Refill mode activated. All compartments have been commanded to open."
        );
      } else {
        setRefillActive(false);
        setMessage(
          "Refill mode deactivated. All compartments have been commanded to close."
        );
      }
    } catch (error) {
      setMessage(
        `Error: ${error.message}. Check that the backend is running and accessible.`
      );
    } finally {
      setLoading(false);
      setShowConfirm(false);
    }
  };

  const handleRefill = () => {
    sendRefillRequest("start");
  };

  const handleCloseAll = () => {
    sendRefillRequest("finish");
  };

  return (
    <div className="refill-page">
      <div className="refill-card">
        <div className="refill-icon">💊</div>

        <h1>Refill Medicine Box</h1>

        <p className="refill-description">
          Open all three medicine compartments to
          refill the tablets.
        </p>

        <div className="compartment-list">
          {[1, 2, 3].map((number) => (
            <div className="compartment" key={number}>
              <span>Compartment {number}</span>
              <span className="status">
                {refillActive
                  ? "Refill mode active"
                  : "Ready for refill"}
              </span>
            </div>
          ))}
        </div>

        <button
          className="refill-button"
          onClick={() => setShowConfirm(true)}
          disabled={loading || refillActive}
        >
          {loading && !refillActive
            ? "Opening..."
            : "Open All Compartments"}
        </button>

        <button
          className="close-button"
          onClick={handleCloseAll}
          disabled={loading || !refillActive}
        >
          {loading && refillActive
            ? "Processing..."
            : "Close All Compartments"}
        </button>

        <p className="refill-note">
          Make sure the medicine box is in a safe
          position before opening or closing it.
        </p>

        {showConfirm && (
          <div className="confirm-box">
            <h3>Confirm Refill</h3>

            <p>
              Do you want to open all three
              compartments?
            </p>

            <div className="confirm-actions">
              <button
                className="cancel-button"
                onClick={() => setShowConfirm(false)}
                disabled={loading}
              >
                Cancel
              </button>

              <button
                className="confirm-button"
                onClick={handleRefill}
                disabled={loading}
              >
                {loading ? "Opening..." : "Confirm"}
              </button>
            </div>
          </div>
        )}

        {message && (
          <p className="refill-message" role="status">
            {message}
          </p>
        )}
      </div>

      <style>{`
        .refill-page {
          min-height: 100vh;
          padding: 32px 16px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #f4f7fb;
          box-sizing: border-box;
          font-family: Arial, sans-serif;
        }

        .refill-card {
          width: 100%;
          max-width: 520px;
          padding: 32px;
          background: white;
          border-radius: 18px;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
          box-sizing: border-box;
        }

        .refill-icon {
          font-size: 42px;
          margin-bottom: 12px;
        }

        .refill-card h1 {
          margin: 0 0 12px;
          color: #172b4d;
          font-size: 28px;
        }

        .refill-description {
          color: #64748b;
          line-height: 1.6;
          margin-bottom: 26px;
        }

        .compartment-list {
          display: grid;
          gap: 12px;
          margin-bottom: 24px;
        }

        .compartment {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          padding: 16px;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          color: #334155;
        }

        .status {
          color: #64748b;
          font-size: 12px;
          text-align: right;
        }

        .refill-button,
        .confirm-button,
        .close-button {
          width: 100%;
          padding: 14px;
          border: none;
          border-radius: 9px;
          color: white;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
        }

        .refill-button,
        .confirm-button {
          background: #2563eb;
        }

        .refill-button:hover:not(:disabled),
        .confirm-button:hover:not(:disabled) {
          background: #1d4ed8;
        }

        .close-button {
          margin-top: 12px;
          background: #dc2626;
        }

        .close-button:hover:not(:disabled) {
          background: #b91c1c;
        }

        button:disabled {
          opacity: 0.55;
          cursor: not-allowed;
        }

        .refill-note {
          margin-top: 16px;
          color: #64748b;
          font-size: 13px;
          line-height: 1.5;
        }

        .confirm-box {
          margin-top: 24px;
          padding: 20px;
          border: 1px solid #cbd5e1;
          border-radius: 12px;
          background: #f8fafc;
        }

        .confirm-box h3 {
          margin-top: 0;
          color: #172b4d;
        }

        .confirm-box p {
          color: #475569;
          line-height: 1.5;
        }

        .confirm-actions {
          display: flex;
          gap: 12px;
          margin-top: 18px;
        }

        .cancel-button {
          width: 100%;
          padding: 12px;
          border: 1px solid #cbd5e1;
          border-radius: 9px;
          background: white;
          cursor: pointer;
        }

        .refill-message {
          margin-top: 18px;
          color: #334155;
          font-size: 14px;
          line-height: 1.5;
          overflow-wrap: anywhere;
        }

        @media (max-width: 480px) {
          .refill-card {
            padding: 22px;
          }

          .refill-card h1 {
            font-size: 24px;
          }

          .compartment {
            align-items: flex-start;
            flex-direction: column;
          }

          .status {
            text-align: left;
          }
        }
      `}</style>
    </div>
  );
}
