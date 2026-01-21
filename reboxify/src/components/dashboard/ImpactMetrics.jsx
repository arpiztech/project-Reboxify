import React from "react";
import { Leaf, Droplets, Wind } from "lucide-react";
import "./ImpactMetrics.css";

const ImpactMetrics = ({ totalBoxesReused, plasticSaved, carbonReduced }) => {
  return (
    <div className="impact-metrics">
      <div className="impact-header">
        <Leaf size={32} className="impact-icon" />
        <h3>Environmental Impact</h3>
      </div>

      <div className="metrics-grid">
        <div className="metric-item">
          <div className="metric-icon">
            <Leaf size={24} />
          </div>
          <div className="metric-content">
            <span className="metric-label">Boxes Reused</span>
            <span className="metric-value">{totalBoxesReused}</span>
          </div>
        </div>

        <div className="metric-item">
          <div className="metric-icon">
            <Droplets size={24} />
          </div>
          <div className="metric-content">
            <span className="metric-label">Plastic Saved</span>
            <span className="metric-value">{plasticSaved} kg</span>
          </div>
        </div>

        <div className="metric-item">
          <div className="metric-icon">
            <Wind size={24} />
          </div>
          <div className="metric-content">
            <span className="metric-label">Carbon Reduced</span>
            <span className="metric-value">{carbonReduced} kg</span>
          </div>
        </div>
      </div>

      <div className="impact-message">
        <p>
          🌱 You're making a difference! Every reusable box saves our planet.
        </p>
      </div>
    </div>
  );
};

export default ImpactMetrics;
