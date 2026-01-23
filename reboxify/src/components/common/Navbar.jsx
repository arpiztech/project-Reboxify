import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Package, Home, Box, History, User, Menu, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { currentUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: Home },
    { path: "/boxes", label: "Boxes", icon: Box },
    { path: "/my-rentals", label: "My Rentals", icon: Package },
    { path: "/rental-history", label: "History", icon: History },
    { path: "/profile", label: "Profile", icon: User },
  ];

  if (!currentUser) return null;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <button
          className="menu-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <ul className={`nav-links ${isOpen ? "active" : ""}`}>
          {navItems.map(({ path, label, icon: Icon }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={() => setIsOpen(false)}
              >
                <Icon size={20} />
                <span>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
