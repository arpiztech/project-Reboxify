import React from "react";
import { Package, Calendar } from "lucide-react";
import { formatDate } from "@utils/formatters";
import "./ActiveRentals.css";

const ActiveRentals = ({ rentals, boxes, onReturn }) => {
  return (
    <div className="active-rentals">
      <div className="rentals-header">
        <Package size={24} />
        <h3>Active Rentals</h3>
        <span className="rentals-count">{rentals.length}</span>
      </div>

      {rentals.length === 0 ? (
        <div className="no-rentals">
          <Package size={48} className="no-rentals-icon" />
          <p>No active rentals</p>
        </div>
      ) : (
        <div className="rentals-list">
          {rentals.map((rental) => {
            const box = boxes.find((b) => b.id === rental.boxId);
            if (!box) return null;

            return (
              <div key={rental.id} className="rental-card">
                <span className="rental-emoji">{box.imageUrl}</span>
                <div className="rental-info">
                  <h4>{box.name}</h4>
                  <div className="rental-meta">
                    <Calendar size={14} />
                    <span>Rented on {formatDate(rental.rentDate)}</span>
                  </div>
                </div>
                <div className="rental-actions">
                  <span className="rental-deposit">₹{rental.deposit}</span>
                  {onReturn && (
                    <button
                      onClick={() => onReturn(rental)}
                      className="btn-return"
                    >
                      Return
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ActiveRentals;
