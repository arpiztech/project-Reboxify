import React, { useState, useEffect } from "react";
import { Users, Package, TrendingUp, DollarSign } from "lucide-react";
import Header from "../components/common/Header";
import StatCard from "../components/dashboard/StatCard";
import userService from "../services/userService";
import boxService from "../services/boxService";
import rentalService from "../services/rentalService";
import analyticsService from "../services/analyticsService";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBoxes: 0,
    activeRentals: 0,
    totalRevenue: 0,
  });

  const [recentUsers, setRecentUsers] = useState([]);
  const [popularBoxes, setPopularBoxes] = useState([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = () => {
    const users = userService.getAllUsers();
    const boxes = boxService.getAllBoxes();
    const activeRentalsCount = rentalService.getActiveRentalsCount();
    const { totalRevenue } = analyticsService.getRevenueStats();
    const popular = analyticsService.getPopularBoxes();

    setStats({
      totalUsers: users.length,
      totalBoxes: boxes.length,
      activeRentals: activeRentalsCount,
      totalRevenue,
    });

    setRecentUsers(users.slice(-5).reverse());
    setPopularBoxes(popular.slice(0, 5));
  };

  const dashboardStats = [
    {
      icon: Users,
      label: "Total Users",
      value: stats.totalUsers,
      color: "#3b82f6",
      bgColor: "#dbeafe",
    },
    {
      icon: Package,
      label: "Total Boxes",
      value: stats.totalBoxes,
      color: "#16a34a",
      bgColor: "#d1fae5",
    },
    {
      icon: TrendingUp,
      label: "Active Rentals",
      value: stats.activeRentals,
      color: "#8b5cf6",
      bgColor: "#ede9fe",
    },
    {
      icon: DollarSign,
      label: "Total Revenue",
      value: `₹${stats.totalRevenue}`,
      color: "#f59e0b",
      bgColor: "#fef3c7",
    },
  ];

  return (
    <div className="admin-dashboard-page">
      <Header />

      <div className="admin-container">
        <div className="admin-header">
          <h2>Admin Dashboard</h2>
          <p>Manage and monitor the ReBoxify platform</p>
        </div>

        <div className="stats-grid">
          {dashboardStats.map((stat, idx) => (
            <StatCard key={idx} {...stat} />
          ))}
        </div>

        <div className="admin-content-grid">
          <div className="admin-card">
            <h3>Recent Users</h3>
            <div className="users-list">
              {recentUsers.length === 0 ? (
                <p className="no-data">No users yet</p>
              ) : (
                recentUsers.map((user) => (
                  <div key={user.id} className="user-item">
                    <div className="user-avatar">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="user-info">
                      <strong>{user.name}</strong>
                      <span>{user.email}</span>
                    </div>
                    <span className="user-wallet">₹{user.wallet}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="admin-card">
            <h3>Popular Boxes</h3>
            <div className="boxes-list">
              {popularBoxes.length === 0 ? (
                <p className="no-data">No boxes rented yet</p>
              ) : (
                popularBoxes.map((box) => (
                  <div key={box.id} className="box-item">
                    <span className="box-emoji">{box.imageUrl}</span>
                    <div className="box-info">
                      <strong>{box.name}</strong>
                      <span>{box.category}</span>
                    </div>
                    <span className="rental-count">
                      {box.rentalCount} rentals
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
