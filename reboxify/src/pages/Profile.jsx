import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, Mail, Wallet, Calendar } from "lucide-react";
import Header from "../components/common/Header";
import { useAuth } from "../context/AuthContext";
import { useBoxes } from "../context/BoxContext";
import "./Profile.css";

const Profile = () => {
  const { currentUser } = useAuth();
  const { getActiveRentals, getRentalHistory, getUserTransactions } =
    useBoxes();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");

  const activeRentals = getActiveRentals();
  const history = getRentalHistory();
  const transactions = getUserTransactions();

  return (
    <div className="profile-page">
      <Header />

      <div className="profile-container">
        <div className="profile-header">
          <button onClick={() => navigate("/dashboard")} className="back-btn">
            <ArrowLeft size={20} />
            Back
          </button>
          <h2>Profile</h2>
        </div>

        <div className="profile-content">
          <div className="profile-sidebar">
            <div className="profile-avatar">
              <User size={64} />
            </div>
            <h3>{currentUser?.name}</h3>
            <p className="profile-email">{currentUser?.email}</p>

            <div className="profile-stats">
              <div className="stat-item">
                <Wallet size={20} />
                <div>
                  <span>Wallet Balance</span>
                  <strong>₹{currentUser?.wallet}</strong>
                </div>
              </div>
              <div className="stat-item">
                <Calendar size={20} />
                <div>
                  <span>Member Since</span>
                  <strong>
                    {new Date(currentUser?.createdAt).toLocaleDateString()}
                  </strong>
                </div>
              </div>
            </div>
          </div>

          <div className="profile-main">
            <div className="tabs">
              <button
                className={`tab ${activeTab === "profile" ? "active" : ""}`}
                onClick={() => setActiveTab("profile")}
              >
                Profile Info
              </button>
              <button
                className={`tab ${activeTab === "transactions" ? "active" : ""}`}
                onClick={() => setActiveTab("transactions")}
              >
                Transactions
              </button>
              <button
                className={`tab ${activeTab === "stats" ? "active" : ""}`}
                onClick={() => setActiveTab("stats")}
              >
                Statistics
              </button>
            </div>

            <div className="tab-content">
              {activeTab === "profile" && (
                <div className="profile-info">
                  <div className="info-group">
                    <label>Full Name</label>
                    <div className="info-value">{currentUser?.name}</div>
                  </div>
                  <div className="info-group">
                    <label>Email Address</label>
                    <div className="info-value">{currentUser?.email}</div>
                  </div>
                  <div className="info-group">
                    <label>Account Type</label>
                    <div className="info-value">
                      {currentUser?.role.toUpperCase()}
                    </div>
                  </div>
                  <div className="info-group">
                    <label>Wallet Balance</label>
                    <div className="info-value wallet">
                      ₹{currentUser?.wallet}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "transactions" && (
                <div className="transactions-list">
                  {transactions.length === 0 ? (
                    <div className="empty-message">No transactions yet</div>
                  ) : (
                    transactions
                      .slice()
                      .reverse()
                      .map((txn) => (
                        <div key={txn.id} className="transaction-item">
                          <div className="txn-info">
                            <strong>{txn.description}</strong>
                            <span>
                              {new Date(txn.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <div
                            className={`txn-amount ${txn.amount > 0 ? "positive" : "negative"}`}
                          >
                            {txn.amount > 0 ? "+" : ""}₹{txn.amount}
                          </div>
                        </div>
                      ))
                  )}
                </div>
              )}

              {activeTab === "stats" && (
                <div className="stats-grid">
                  <div className="stat-card">
                    <h4>Active Rentals</h4>
                    <div className="stat-value">{activeRentals.length}</div>
                  </div>
                  <div className="stat-card">
                    <h4>Total Returns</h4>
                    <div className="stat-value">{history.length}</div>
                  </div>
                  <div className="stat-card">
                    <h4>Total Transactions</h4>
                    <div className="stat-value">{transactions.length}</div>
                  </div>
                  <div className="stat-card">
                    <h4>Current Balance</h4>
                    <div className="stat-value">₹{currentUser?.wallet}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
