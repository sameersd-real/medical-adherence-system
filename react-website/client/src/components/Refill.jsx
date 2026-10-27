
import { useState } from "react";

export default function Refill() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState("");

  const handleRefill = async () => {
    setMessage("");
    setShowConfirm(false);

    // Backend integration will be added after
    // checking your existing Node.js API.
    setMessage(
      "Backend connection is not configured yet."
    );
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
            <div
              className="compartment"
              key={number}
            >
              <span>Compartment {number}</span>
              <span className="status">
                Ready for refill
              </span>
            </div>
          ))}
        </div>

        <button
          className="refill-button"
          onClick={() => setShowConfirm(true)}
        >
          Open All Compartments
        </button>

        <p className="refill-note">
          Make sure the medicine box is in a safe
          position before opening.
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
              >
                Cancel
              </button>

              <button
                className="confirm-button"
                onClick={handleRefill}
              >
                Confirm
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
          box-shadow: 0 8px 30px
            rgba(0, 0, 0, 0.08);
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
        .confirm-button {
          width: 100%;
          padding: 14px;
          border: none;
          border-radius: 9px;
          background: #2563eb;
          color: white;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
        }

        .refill-button:hover,
        .confirm-button:hover {
          background: #1d4ed8;
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
          color: #b45309;
          font-size: 14px;
          line-height: 1.5;
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
