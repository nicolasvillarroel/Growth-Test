// src/components/Button.js
import React from "react";

const Button = ({ onClick, children, color = "primary", width = "100%" }) => {
  const getColorStyle = () => {
    switch (color) {
      case "primary":
        return styles.primaryButton;
      case "secondary":
        return styles.secondaryButton;
      case "danger":
        return styles.dangerButton;
      default:
        return styles.primaryButton;
    }
  };

  return (
    <button onClick={onClick} style={{ ...styles.button, ...getColorStyle() }}>
      {children}
    </button>
  );
};
const styles = {
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    borderRadius: "4px",
    border: "none",
  },
  primaryButton: {
    backgroundColor: "#007bff",
    color: "white",
  },
  secondaryButton: {
    backgroundColor: "#6c757d",
    color: "white",
  },
  dangerButton: {
    backgroundColor: "#dc3545",
    color: "white",
  },
};

export default Button;
