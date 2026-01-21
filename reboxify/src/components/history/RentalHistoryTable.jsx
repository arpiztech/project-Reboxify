import React from "react";
import { formatDate } from "@utils/formatters";
import "./RentalHistoryTable.css";

const RentalHistoryTable = ({ rentals, boxes }) => {
  return (
    <div className="rental-history-table">
      <table>
        <thead>
          <tr>
            <th>Box</th>
            <th>Rented On</th>
            <th>Returned On</th>
            <th>Condition</th>
            <th>Deposit</th>
            <th>Refund</th>
          </tr>
        </thead>
        <tbody>
          {rentals.length === 0 ? (
            <tr>
              <td colSpan="6" className="no-data">
                No rental history available
              </td>
            </tr>
          ) : (
            rentals.map((rental) => {
              const box = boxes.find((b) => b.id === rental.boxId);
              if (!box) return null;

              const refund =
                rental.returnCondition === "good"
                  ? rental.deposit
                  : Math.floor(rental.deposit * 0.8);

              return (
                <tr key={rental.id}>
                  <td>
                    <div className="box-info">
                      <span className="box-icon">{box.imageUrl}</span>
                      <strong>{box.name}</strong>
                    </div>
                  </td>
                  <td>{formatDate(rental.rentDate)}</td>
                  <td>
                    {rental.returnDate ? formatDate(rental.returnDate) : "-"}
                  </td>
                  <td>
                    <span
                      className={`condition-badge ${rental.returnCondition}`}
                    >
                      {rental.returnCondition?.toUpperCase()}
                    </span>
                  </td>
                  <td className="deposit">₹{rental.deposit}</td>
                  <td className="refund">₹{refund}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RentalHistoryTable;
