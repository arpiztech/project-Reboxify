import React from "react";
import { Package } from "lucide-react";
import "./AuthLayout.css";

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="auth-layout">
      <div className="auth-background"></div>
      <div className="auth-card">
        <div className="auth-brand">
          <Package size={48} />
          <h1>ReBoxify</h1>
        </div>
        {(title || subtitle) && (
          <div className="auth-header">
            {title && <h2>{title}</h2>}
            {subtitle && <p>{subtitle}</p>}
          </div>
        )}
        <div className="auth-content">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
