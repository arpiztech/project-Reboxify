import React from "react";
import { CheckCircle, XCircle, AlertCircle, Info, X } from "lucide-react";
import "./Alert.css";

const Alert = ({ type = "info", message, onClose }) => {
  const icons = {
    success: <CheckCircle size={20} />,
    error: <XCircle size={20} />,
    warning: <AlertCircle size={20} />,
    info: <Info size={20} />,
  };

  const icon = icons[type] || icons.info;

  return (
    <div className={`alert alert-${type}`}>
      <div className="alert-icon">{icon}</div>
      <div className="alert-message">{message}</div>
      {onClose && (
        <button onClick={onClose} className="alert-close">
          <X size={18} />
        </button>
      )}
    </div>
  );
};

export default Alert;
