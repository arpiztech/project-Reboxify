import React from "react";
import { useNavigate } from "react-router-dom";
import { Package, TrendingUp, CheckCircle, Leaf } from "lucide-react";
import Header from "../components/common/Header";
import { useAuth } from "../context/AuthContext";
import { useBoxes } from "../context/BoxContext";
import { ENVIRONMENTAL_IMPACT } from "../utils/constants";
import "./Dashboard.css";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const { boxes, getActiveRentals, getRentalHistory } = useBoxes();
  const navigate = useNavigate();

  const activeRentals = getActiveRentals();
  const history = getRentalHistory();
  const availableBoxes = boxes.filter((b) => b.status === "available");

  const plasticSaved =
    history.length * ENVIRONMENTAL_IMPACT.PLASTIC_SAVED_PER_BOX;
  const carbonReduced =
    history.length * ENVIRONMENTAL_IMPACT.CARBON_REDUCED_PER_BOX;

  const stats = [
    {
      label: "Active Rentals",
      value: activeRentals.length,
      icon: Package,
      color: "#3b82f6",
      bgColor: "#dbeafe",
    },
    {
      label: "Available Boxes",
      value: availableBoxes.length,
      icon: Package,
      color: "#16a34a",
      bgColor: "#d1fae5",
    },
    {
      label: "Total Returns",
      value: history.length,
      icon: CheckCircle,
      color: "#8b5cf6",
      bgColor: "#ede9fe",
    },
    {
      label: "Plastic Saved (kg)",
      value: plasticSaved.toFixed(1),
      icon: TrendingUp,
      color: "#f59e0b",
      bgColor: "#fef3c7",
    },
  ];

  // ===== Achievements Logic (ADD ONLY) =====
  const achievements = [
    {
      title: "Eco Warrior",
      description: "Completed 20+ rentals",
      achieved: history.length >= 20,
    },
    {
      title: "Early Adopter",
      description: "Member since Q1 2024",
      achieved: true, // static for now, can be dynamic later
    },
    {
      title: "Perfect Record",
      description: "All returns on time",
      achieved: history.length > 0 && activeRentals.length === 0,
    },
  ];

  // ===== NEW: Recent Activity =====
  const recentActivities = [
    {
      action: "Rented Medium Box",
      timestamp: "2 hours ago",
      type: "rental",
    },
    {
      action: "Returned Small Box",
      timestamp: "1 day ago",
      type: "return",
    },
    {
      action: "Achievement Unlocked: Eco Warrior",
      timestamp: "3 days ago",
      type: "achievement",
    },
  ].slice(0, Math.min(3, history.length + activeRentals.length));

  // ===== NEW: Leaderboard =====
  const leaderboard = [
    { rank: 1, name: "EcoChampion", rentals: 45, isCurrentUser: false },
    {
      rank: 2,
      name: currentUser?.name || "You",
      rentals: history.length,
      isCurrentUser: true,
    },
    { rank: 3, name: "GreenWarrior", rentals: 18, isCurrentUser: false },
    { rank: 4, name: "PlasticFree", rentals: 15, isCurrentUser: false },
  ];

  // ===== NEW: Eco Tips =====
  const ecoTips = [
    {
      icon: "♻️",
      title: "Reuse & Recycle",
      content: "Always return boxes on time to help others save plastic!",
    },
    {
      icon: "🌍",
      title: "Spread the Word",
      content: "Share your eco-journey with friends and family.",
    },
  ];

  // ===== NEW: Monthly Goals =====
  const monthlyGoals = [
    {
      name: "Rent 5 boxes this month",
      current: Math.min(activeRentals.length, 5),
      target: 5,
    },
    {
      name: "Save 2kg of plastic",
      current: Math.min(plasticSaved, 2),
      target: 2,
    },
  ];

  return (
    <div className="dashboard-page">
      <Header />

      <div className="dashboard-container">
        <div className="dashboard-welcome">
          <h2>Welcome back, {currentUser?.name}! 👋</h2>
          <p>Manage your sustainable packaging journey</p>
        </div>

        <div className="stats-grid">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-card">
              <div
                className="stat-icon"
                style={{ backgroundColor: stat.bgColor, color: stat.color }}
              >
                <stat.icon size={28} />
              </div>
              <div className="stat-content">
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Quick Actions</h3>
            <div className="quick-actions">
              <button
                onClick={() => navigate("/boxes")}
                className="action-btn primary"
              >
                <Package size={20} />
                Browse Boxes
              </button>
              <button
                onClick={() => navigate("/my-rentals")}
                className="action-btn secondary"
              >
                <CheckCircle size={20} />
                My Rentals
              </button>
              <button
                onClick={() => navigate("/rental-history")}
                className="action-btn tertiary"
              >
                <TrendingUp size={20} />
                View History
              </button>
            </div>
          </div>

          <div className="dashboard-card impact-card">
            <div className="impact-header">
              <Leaf size={32} color="#16a34a" />
              <h3>Environmental Impact</h3>
            </div>
            <div className="impact-stats">
              <div className="impact-stat">
                <span className="impact-label">Boxes Reused</span>
                <span className="impact-value">{history.length}</span>
              </div>
              <div className="impact-stat">
                <span className="impact-label">Plastic Saved</span>
                <span className="impact-value">
                  {plasticSaved.toFixed(1)} kg
                </span>
              </div>
              <div className="impact-stat">
                <span className="impact-label">Carbon Reduced</span>
                <span className="impact-value">
                  {carbonReduced.toFixed(1)} kg
                </span>
              </div>
            </div>
            <div className="impact-message">
              <p>
                🌱 You're making a difference! Every reusable box saves our
                planet.
              </p>
            </div>
          </div>
        </div>

        {/* ===== Achievements Section (ADD ONLY) ===== */}
        <div className="dashboard-card achievements-card">
          <h3>🏅 Achievements</h3>

          <div className="achievements-list">
            {achievements.map((item, index) => (
              <div
                key={index}
                className={`achievement-item ${item.achieved ? "achieved" : "locked"}`}
              >
                <div className="achievement-info">
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>

                {item.achieved && <span className="achievement-check">✔</span>}
              </div>
            ))}
          </div>
        </div>

        {/* ===== NEW: Recent Activity Timeline ===== */}
        {recentActivities.length > 0 && (
          <div className="dashboard-card">
            <h3>📋 Recent Activity</h3>
            <div className="activity-timeline">
              {recentActivities.map((activity, index) => (
                <div key={index} className="activity-item">
                  <div className="activity-dot"></div>
                  <div className="activity-content">
                    <h4>{activity.action}</h4>
                    <p>{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== NEW: Leaderboard ===== */}
        <div className="dashboard-card leaderboard-card">
          <h3>🏆 Top Eco Warriors</h3>
          <div className="leaderboard-list">
            {leaderboard.map((user, index) => (
              <div key={index} className="leaderboard-item">
                <span className="leaderboard-rank">#{user.rank}</span>
                <div className="leaderboard-info">
                  <h4>
                    {user.name} {user.isCurrentUser && "(You)"}
                  </h4>
                  <p>{user.rentals} boxes reused</p>
                </div>
                <span className="leaderboard-score">{user.rentals}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ===== NEW: Eco Tips ===== */}
        <div className="dashboard-card tips-card">
          <h3>💡 Eco Tips</h3>
          {ecoTips.map((tip, index) => (
            <div key={index} className="tip-item">
              <span className="tip-icon">{tip.icon}</span>
              <div className="tip-content">
                <h4>{tip.title}</h4>
                <p>{tip.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ===== NEW: Monthly Goals ===== */}
        <div className="dashboard-card goals-card">
          <h3>🎯 Monthly Goals</h3>
          {monthlyGoals.map((goal, index) => (
            <div key={index} className="goal-item">
              <div className="goal-header">
                <h4>{goal.name}</h4>
                <span className="goal-percentage">
                  {Math.round((goal.current / goal.target) * 100)}%
                </span>
              </div>
              <div className="goal-progress-bar">
                <div
                  className="goal-progress-fill"
                  style={{ width: `${(goal.current / goal.target) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {activeRentals.length > 0 && (
          <div className="dashboard-card">
            <h3>Active Rentals</h3>
            <div className="active-rentals-list">
              {activeRentals.map((rental) => {
                const box = boxes.find((b) => b.id === rental.boxId);
                if (!box) return null;

                return (
                  <div key={rental.id} className="rental-item">
                    <span className="rental-emoji">{box.imageUrl}</span>
                    <div className="rental-info">
                      <h4>{box.name}</h4>
                      <p>
                        Rented on{" "}
                        {new Date(rental.rentDate).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="rental-deposit">₹{rental.deposit}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
