import React from "react";
import "./StatCard.css";

const StatCard = ({ icon: Icon, label, value, color, bgColor, trend }) => {
  return (
    <div className="stat-card">
      <div
        className="stat-card-icon"
        style={{ backgroundColor: bgColor, color: color }}
      >
        <Icon size={28} />
      </div>
      <div className="stat-card-content">
        <h3 className="stat-card-value">{value}</h3>
        <p className="stat-card-label">{label}</p>
        {trend && (
          <span className={`stat-card-trend ${trend.type}`}>{trend.value}</span>
        )}
      </div>
    </div>
  );
};

export default StatCard;
