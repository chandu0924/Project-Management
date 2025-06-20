import React from "react";
import "./Popup.css";

{/* <Popup
    type="warning"
    message="Are you sure you want to delete this item?"
    onOk={handleConfirm}
    onCancel={handleCancel}
/> */}

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
