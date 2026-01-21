import React from "react";
import { Package } from "lucide-react";
import "./BoxCard.css";

const BoxCard = ({ box, onRent, onViewDetails }) => {
  const isAvailable = box.status === "available";

  return (
    <div className={`box-card ${!isAvailable ? "box-card-disabled" : ""}`}>
      <div className="box-card-image">
        <span className="box-emoji">{box.imageUrl}</span>
        <span className={`box-status-badge ${box.status}`}>
          {box.status.toUpperCase()}
        </span>
      </div>

      <div className="box-card-content">
        <h3 className="box-card-title">{box.name}</h3>
        <p className="box-card-description">{box.description}</p>

        <div className="box-card-specs">
          <div className="spec-item">
            <span className="spec-label">Size</span>
            <span className="spec-value">{box.size}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Category</span>
            <span className="spec-value">{box.category}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Deposit</span>
            <span className="spec-value price">₹{box.deposit}</span>
          </div>
        </div>

        <div className="box-card-actions">
          {onViewDetails && (
            <button
              onClick={() => onViewDetails(box)}
              className="btn-secondary-outline"
            >
              Details
            </button>
          )}
          <button
            onClick={() => onRent(box)}
            disabled={!isAvailable}
            className="btn-primary"
          >
            {isAvailable ? "Rent Now" : "Not Available"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoxCard;
