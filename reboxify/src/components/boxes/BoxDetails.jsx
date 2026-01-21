import React from "react";
import { X, Package, Ruler, Weight, Box as BoxIcon } from "lucide-react";
import "./BoxDetails.css";

const BoxDetails = ({ box, onClose, onRent }) => {
  if (!box) return null;

  return (
    <div className="box-details-overlay" onClick={onClose}>
      <div className="box-details-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="box-details-header">
          <div className="box-details-image">
            <span className="box-emoji-large">{box.imageUrl}</span>
          </div>
          <div className="box-details-title">
            <h2>{box.name}</h2>
            <span className={`status-badge ${box.status}`}>
              {box.status.toUpperCase()}
            </span>
          </div>
        </div>

        <div className="box-details-content">
          <div className="details-section">
            <h3>Description</h3>
            <p>{box.description}</p>
          </div>

          <div className="details-section">
            <h3>Specifications</h3>
            <div className="specs-grid">
              <div className="spec-detail">
                <Ruler size={20} />
                <div>
                  <span className="spec-detail-label">Dimensions</span>
                  <span className="spec-detail-value">{box.size}</span>
                </div>
              </div>
              <div className="spec-detail">
                <BoxIcon size={20} />
                <div>
                  <span className="spec-detail-label">Capacity</span>
                  <span className="spec-detail-value">{box.capacity}</span>
                </div>
              </div>
              <div className="spec-detail">
                <Weight size={20} />
                <div>
                  <span className="spec-detail-label">Weight</span>
                  <span className="spec-detail-value">{box.weight}</span>
                </div>
              </div>
              <div className="spec-detail">
                <Package size={20} />
                <div>
                  <span className="spec-detail-label">Material</span>
                  <span className="spec-detail-value">{box.material}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="details-section">
            <h3>Rental Information</h3>
            <div className="rental-info">
              <div className="rental-info-item">
                <span>Category</span>
                <strong>{box.category}</strong>
              </div>
              <div className="rental-info-item">
                <span>Deposit Amount</span>
                <strong className="price">₹{box.deposit}</strong>
              </div>
              <div className="rental-info-item">
                <span>Refund Policy</span>
                <strong>100% on good condition</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="box-details-footer">
          <button onClick={onClose} className="btn-cancel">
            Close
          </button>
          <button
            onClick={() => onRent(box)}
            disabled={box.status !== "available"}
            className="btn-rent"
          >
            {box.status === "available" ? "Rent This Box" : "Not Available"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoxDetails;
