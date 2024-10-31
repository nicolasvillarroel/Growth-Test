// src/pages/SolicitorDashboard.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/button";

const SolicitorDashboard = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedServices = JSON.parse(localStorage.getItem("services")) || [];
    setServices(savedServices);
  }, []);

  const clearServices = () => {
    setServices([]);
    localStorage.removeItem("services");
  };

  const calculateRemainingForFree = () => {
    const totalServices = services.length;
    const remainder = totalServices % 5; // Cada 5ta es gratis
    return remainder === 0 ? 5 : 5 - remainder;
  };

  const getFreeServiceMessage = () => {
    const remaining = calculateRemainingForFree();
    if (remaining === 1) {
      return (
        <p style={styles.highlightMessage}>SOLICITA OTRO, es el 5to: GRATIS</p>
      );
    } else {
      return <p>Pedidos hasta el próximo gratis: {remaining}</p>;
    }
  };

  const handleEvaluation = (id, score) => {
    const updatedServices = services.map((service) =>
      service.id === id ? { ...service, evaluation: score } : service
    );
    setServices(updatedServices);
    localStorage.setItem("services", JSON.stringify(updatedServices));
  };

  const cancelService = (id) => {
    const updatedServices = services.filter((service) => service.id !== id);
    setServices(updatedServices);
    localStorage.setItem("services", JSON.stringify(updatedServices));
  };

  return (
    <div style={styles.container}>
      <h2>Mis Servicios Solicitados</h2>
      {getFreeServiceMessage()}
      <div style={styles.buttonContainer}>
        <Button
          onClick={() => navigate("/solicitor/request")}
          color="primary"
          width="200px"
        >
          Solicitar Servicio
        </Button>
        <Button onClick={clearServices} color="danger" width="200px">
          Limpiar Servicios
        </Button>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Servicio</th>
            <th style={styles.tableHeader}>Nombre del Receptor</th>
            <th style={styles.tableHeader}>Estado</th>
            <th style={styles.tableHeader}>Evaluar</th>
            <th style={styles.tableHeader}>Cancelar</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id} style={styles.tableRow}>
              <td style={styles.tableCell}>{service.name}</td>
              <td style={styles.tableCell}>{service.recipientName}</td>
              <td style={styles.tableCell}>
                {service.status === "completado"
                  ? "Completado"
                  : service.status === "en progreso"
                  ? "En Progreso"
                  : "Esperando Proveedor"}
              </td>
              <td style={styles.tableCell}>
                {service.status === "completado" ? (
                  <select
                    value={service.evaluation || ""}
                    onChange={(e) =>
                      handleEvaluation(service.id, e.target.value)
                    }
                    style={styles.select}
                  >
                    <option value="">Nulo</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                ) : (
                  "No disponible"
                )}
              </td>
              <td style={styles.tableCell}>
                {service.status === "esperando proveedor" ? (
                  <Button
                    onClick={() => cancelService(service.id)}
                    color="danger"
                    width="100px"
                  >
                    Cancelar
                  </Button>
                ) : (
                  "No disponible"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    width: "100%",
  },
  buttonContainer: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
    justifyContent: "center",
    width: "100%",
  },
  table: {
    width: "80%",
    borderCollapse: "collapse",
  },
  tableHeader: {
    padding: "10px",
    textAlign: "left",
    fontWeight: "bold",
    borderBottom: "2px solid #ddd",
  },
  tableRow: {
    borderBottom: "1px solid #ddd",
  },
  tableCell: {
    padding: "10px",
    textAlign: "left",
  },
  select: {
    padding: "5px",
    fontSize: "16px",
  },
  highlightMessage: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "green",
    marginBottom: "10px",
  },
};

export default SolicitorDashboard;
