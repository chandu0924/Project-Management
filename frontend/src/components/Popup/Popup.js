import React from "react";
import "./Popup.css";

export default function Popup({ type = "info", message, onOk, onCancel }) {
  return (
    <div className={`popup-overlay`}>
      <div className={`popup-box ${type}`}>
        <p className="popup-message">{message}</p>
        <div className="popup-buttons">
          <button className="popup-ok" onClick={onOk}>OK</button>
          <button className="popup-cancel" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
