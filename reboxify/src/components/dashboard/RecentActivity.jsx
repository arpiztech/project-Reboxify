import React from "react";
import { Clock } from "lucide-react";
import { formatRelativeTime } from "@utils/formatters";
import "./RecentActivity.css";

const RecentActivity = ({ transactions, boxes }) => {
  const getBoxName = (boxId) => {
    const box = boxes.find((b) => b.id === boxId);
    return box ? box.name : "Unknown Box";
  };

  const getActivityIcon = (type) => {
    return type === "rent" ? "📦" : "✅";
  };

  const getActivityColor = (type) => {
    return type === "rent" ? "activity-rent" : "activity-return";
  };

  return (
    <div className="recent-activity">
      <div className="activity-header">
        <Clock size={24} />
        <h3>Recent Activity</h3>
      </div>

      {transactions.length === 0 ? (
        <div className="no-activity">
          <p>No recent activity</p>
        </div>
      ) : (
        <div className="activity-list">
          {transactions.slice(0, 5).map((transaction) => (
            <div
              key={transaction.id}
              className={`activity-item ${getActivityColor(transaction.type)}`}
            >
              <span className="activity-icon">
                {getActivityIcon(transaction.type)}
              </span>
              <div className="activity-content">
                <p className="activity-description">
                  {transaction.description}
                </p>
                <span className="activity-time">
                  {formatRelativeTime(transaction.timestamp)}
                </span>
              </div>
              <span
                className={`activity-amount ${transaction.amount > 0 ? "positive" : "negative"}`}
              >
                {transaction.amount > 0 ? "+" : ""}₹
                {Math.abs(transaction.amount)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentActivity;
