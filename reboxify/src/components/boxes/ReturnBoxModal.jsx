import React from "react";
import { CheckCircle, AlertCircle } from "lucide-react";
import "./RentBoxModal.css";

const RentBoxModal = ({ box, onConfirm, onCancel, userWallet }) => {
  if (!box) return null;

  const canAfford = userWallet >= box.deposit;

  return (
    <div className="rent-modal-overlay" onClick={onCancel}>
      <div className="rent-modal" onClick={(e) => e.stopPropagation()}>
        <h3>Confirm Rental</h3>

        <div className="rent-modal-content">
          <div className="box-preview">
            <span className="box-icon">{box.imageUrl}</span>
            <div>
              <h4>{box.name}</h4>
              <p>{box.size}</p>
            </div>
          </div>

          <div className="rental-details">
            <div className="detail-row">
              <span>Deposit Amount:</span>
              <strong className="amount">₹{box.deposit}</strong>
            </div>
            <div className="detail-row">
              <span>Your Wallet Balance:</span>
              <strong
                className={canAfford ? "amount-success" : "amount-danger"}
              >
                ₹{userWallet}
              </strong>
            </div>
            <div className="detail-row">
              <span>After Rental:</span>
              <strong className="amount">₹{userWallet - box.deposit}</strong>
            </div>
          </div>

          {canAfford ? (
            <div className="info-message success">
              <CheckCircle size={20} />
              <p>You have sufficient balance to rent this box</p>
            </div>
          ) : (
            <div className="info-message error">
              <AlertCircle size={20} />
              <p>Insufficient wallet balance. Please add funds.</p>
            </div>
          )}

          <div className="rental-terms">
            <h5>Rental Terms:</h5>
            <ul>
              <li>Deposit is fully refundable on return in good condition</li>
              <li>80% refund if box is damaged</li>
              <li>Return anytime through the app</li>
            </ul>
          </div>
        </div>

        <div className="rent-modal-actions">
          <button onClick={onCancel} className="btn-cancel">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={!canAfford}
            className="btn-confirm"
          >
            Confirm Rental
          </button>
        </div>
      </div>
    </div>
  );
};

export default RentBoxModal;
