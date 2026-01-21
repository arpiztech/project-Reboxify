import React from "react";
import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import { formatDateTime } from "@utils/formatters";
import "./TransactionItem.css";

const TransactionItem = ({ transaction, box }) => {
  const isPositive = transaction.amount > 0;

  return (
    <div className={`transaction-item ${isPositive ? "positive" : "negative"}`}>
      <div className="transaction-icon">
        {isPositive ? (
          <ArrowUpCircle size={24} className="icon-up" />
        ) : (
          <ArrowDownCircle size={24} className="icon-down" />
        )}
      </div>

      <div className="transaction-details">
        <h4>{transaction.description}</h4>
        <p>{formatDateTime(transaction.timestamp)}</p>
        {box && <span className="box-name">{box.name}</span>}
      </div>

      <div
        className={`transaction-amount ${isPositive ? "amount-positive" : "amount-negative"}`}
      >
        {isPositive ? "+" : ""}₹{Math.abs(transaction.amount)}
      </div>
    </div>
  );
};

export default TransactionItem;
