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
      <h2 style={styles.subtitle}>
        Aplicación de charchazos y abrazos: ya no tienes que demostrar tu afecto
        o enojo presencialmente, nosotros ofrecemos ese servicio por ti.
      </h2>
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
  subtitle: {
    fontSize: "18px",
    fontWeight: "normal",
    color: "#555",
    margin: "20px 0",
    maxWidth: "600px",
  },
  button: {
    padding: "10px 20px",
    margin: "10px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default Home;
