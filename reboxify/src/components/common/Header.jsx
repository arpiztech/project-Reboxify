import React from "react";
import { useNavigate } from "react-router-dom";
import { Package, User, LogOut, Wallet } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import "./Header.css";

const Header = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <div className="logo" onClick={() => navigate("/dashboard")}>
            <Package size={32} />
            <h1>ReBoxify</h1>
          </div>
        </div>

        {currentUser && (
          <div className="header-right">
            <div className="wallet-info">
              <Wallet size={20} />
              <span>₹{currentUser.wallet}</span>
            </div>

            <div className="user-info">
              <User size={20} />
              <span>{currentUser.name}</span>
            </div>

            <button onClick={handleProfileClick} className="btn-profile">
              Profile
            </button>

            <button onClick={handleLogout} className="btn-logout">
              <LogOut size={18} />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
