import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = (userType) => {
    navigate(`/login/${userType}`);
  };

  return (
    <div style={styles.container}>
      <h1>Bienvenido a Charchazos y Abrazos</h1>
      <button
        style={styles.button}
        onClick={() => handleLoginRedirect("solicitor")}
      >
        Iniciar como Solicitor
      </button>
      <button
        style={styles.button}
        onClick={() => handleLoginRedirect("provider")}
      >
        Iniciar como Proveedor
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    textAlign: "center",
  },
  button: {
    padding: "10px 20px",
    margin: "10px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default Home;
