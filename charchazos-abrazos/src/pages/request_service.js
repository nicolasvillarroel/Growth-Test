import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/button";

const RequestService = ({ onSubmit }) => {
  const [serviceType, setServiceType] = useState("Charchazo");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("Hombre");
  const [recipientName, setRecipientName] = useState("");
  const [isFree, setIsFree] = useState(false);
  const [showSuggestion, setShowSuggestion] = useState(false); // Estado para mostrar el modal de sugerencia
  const navigate = useNavigate();

  useEffect(() => {
    const savedServices = JSON.parse(localStorage.getItem("services")) || [];
    setIsFree((savedServices.length + 1) % 5 === 0); // El próximo servicio es gratis si es múltiplo de 5
  }, []);

  const handleSubmit = () => {
    if (!address || !recipientName) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    onSubmit({
      id: Date.now(),
      name: serviceType,
      address,
      gender,
      recipientName,
      status: "esperando proveedor",
      evaluated: false,
      cost: isFree ? 0 : 5000,
    });

    // Mostrar el modal de sugerencia
    setShowSuggestion(true);
  };

  const handleScheduleAnother = () => {
    // Restablecer los valores de los inputs
    setServiceType("Charchazo");
    setAddress("");
    setGender("Hombre");
    setRecipientName("");

    // Cerrar el modal
    setShowSuggestion(false);
  };

  const handleCloseSuggestion = () => {
    setShowSuggestion(false);
    navigate("/solicitor"); // Redirige al dashboard
  };

  return (
    <div style={styles.container}>
      <h2>Solicitar Servicio</h2>
      <p>Costo: {isFree ? "Gratis" : "$5000"}</p>

      <label style={styles.label}>
        Tipo de servicio:
        <select
          value={serviceType}
          onChange={(e) => setServiceType(e.target.value)}
          style={styles.input}
        >
          <option value="Charchazo">Charchazo</option>
          <option value="Abrazo">Abrazo</option>
        </select>
      </label>

      <label style={styles.label}>
        Dirección:
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={styles.input}
          placeholder="Ingresa la dirección"
        />
      </label>

      <label style={styles.label}>
        Género del receptor:
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          style={styles.input}
        >
          <option value="Hombre">Hombre</option>
          <option value="Mujer">Mujer</option>
        </select>
      </label>

      <label style={styles.label}>
        Nombre del receptor:
        <input
          type="text"
          value={recipientName}
          onChange={(e) => setRecipientName(e.target.value)}
          style={styles.input}
          placeholder="Ingresa el nombre del receptor"
        />
      </label>

      <Button onClick={handleSubmit} color="primary">
        Confirmar Solicitud
      </Button>

      {showSuggestion && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3>No hay primera sin segunda!</h3>
            <p>¡Agenda otro servicio!</p>
            <Button
              onClick={handleScheduleAnother}
              color="primary"
              width="200px"
            >
              Agendar Otro Servicio
            </Button>
            <Button
              onClick={handleCloseSuggestion}
              color="secondary"
              width="200px"
            >
              Volver al Dashboard
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    maxWidth: "400px",
    margin: "0 auto",
  },
  label: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
    marginBottom: "15px",
    fontSize: "16px",
    fontWeight: "bold",
  },
  input: {
    marginTop: "5px",
    padding: "10px",
    fontSize: "16px",
    width: "100%",
    borderRadius: "4px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
};

export default RequestService;
