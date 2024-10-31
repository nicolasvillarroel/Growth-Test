import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../components/button";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Credenciales de prueba
  const validCredentials = {
    solicitor: {
      username: "solicitor123@dummymail.com",
      password: "charchazopalquelee",
    },
    provider: {
      username: "proveedor456@dummymail.com",
      password: "rayomcqueen",
    },
  };

  const handleLogin = () => {
    const userType = location.pathname.includes("solicitor")
      ? "solicitor"
      : "provider";

    if (
      username === validCredentials[userType].username &&
      password === validCredentials[userType].password
    ) {
      // Guardamos el tipo de usuario en localStorage
      localStorage.setItem("userType", userType);
      navigate(`/${userType}`);
    } else {
      setError("Credenciales incorrectas. Por favor, intenta de nuevo.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Iniciar Sesión</h2>
      <input
        type="text"
        placeholder="Nombre de usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />
      {error && <p style={styles.error}>{error}</p>}
      <Button onClick={handleLogin} color="secondary">
        Iniciar Sesión
      </Button>
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
  input: {
    margin: "10px",
    padding: "10px",
    fontSize: "16px",
    width: "250px",
  },
  error: {
    color: "red",
  },
};

export default Login;
