// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import SolicitorDashboard from "./pages/solicitor_dashboard";
import ProviderDashboard from "./pages/provider_dashboard";
import RequestService from "./pages/request_service";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
    document.body.classList.toggle("dark-mode", !darkMode);
  };

  const handleAddService = (newService) => {
    const savedServices = JSON.parse(localStorage.getItem("services")) || [];
    savedServices.push(newService);
    localStorage.setItem("services", JSON.stringify(savedServices));
  };

  return (
    <Router>
      <button onClick={toggleDarkMode} style={styles.toggleButton}>
        {darkMode ? "Modo Claro" : "Modo Oscuro"}
      </button>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login/solicitor" element={<Login />} />
        <Route path="/login/provider" element={<Login />} />
        <Route path="/solicitor" element={<SolicitorDashboard />} />
        <Route path="/provider" element={<ProviderDashboard />} />
        <Route
          path="/solicitor/request"
          element={<RequestService onSubmit={handleAddService} />}
        />
      </Routes>
    </Router>
  );
}

const styles = {
  toggleButton: {
    position: "fixed",
    top: "10px",
    right: "10px",
    padding: "10px",
    cursor: "pointer",
  },
};

export default App;
