// src/pages/ProviderDashboard.js
import React, { useState, useEffect } from "react";
import Button from "../components/button";

const ProviderDashboard = () => {
  const [services, setServices] = useState([]);
  const [descriptions, setDescriptions] = useState({});

  useEffect(() => {
    const savedServices = JSON.parse(localStorage.getItem("services")) || [];
    setServices(savedServices);
  }, []);

  const updateServiceStatus = (id, status) => {
    const updatedServices = services.map((service) =>
      service.id === id
        ? { ...service, status, description: descriptions[id] || "" }
        : service
    );
    setServices(updatedServices);
    localStorage.setItem("services", JSON.stringify(updatedServices));
  };

  const handleDescriptionChange = (id, text) => {
    setDescriptions((prev) => ({
      ...prev,
      [id]: text,
    }));
  };

  const calculateAverageRating = () => {
    const completedServices = services.filter(
      (service) => service.status === "completado" && service.evaluation
    );
    if (completedServices.length === 0) return 0;
    const totalRating = completedServices.reduce(
      (sum, service) => sum + parseInt(service.evaluation, 10),
      0
    );
    return totalRating / completedServices.length;
  };

  const calculateEarnings = () => {
    return services.reduce((total, service) => {
      if (service.status === "completado") {
        return total + (service.name === "Abrazo" ? 2500 : 4000);
      }
      return total;
    }, 0);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    return (
      <>
        {"★".repeat(fullStars)}
        {halfStar ? "½" : ""}
        {"☆".repeat(emptyStars)}
      </>
    );
  };

  const averageRating = calculateAverageRating();
  const totalEarnings = calculateEarnings();

  return (
    <div style={styles.container}>
      <h2>Servicios Pendientes</h2>
      <p style={styles.earningsMessage}>
        Te pagamos $2500 por cada abrazo y $4000 por cada charchazo...
        <br />
        Hasta el momento has acumulado: ${totalEarnings}
        <br />
        ¡VAMOS POR MÁS!
      </p>
      <p>
        Evaluado en un: {averageRating.toFixed(1)} {renderStars(averageRating)}
      </p>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Tipo</th>
            <th style={styles.tableHeader}>Dirección</th>
            <th style={styles.tableHeader}>Nombre</th>
            <th style={styles.tableHeader}>Sexo</th>
            <th style={styles.tableHeader}>Acciones</th>
            <th style={styles.tableHeader}>Evaluación Obtenida</th>
            <th style={styles.tableHeader}>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id} style={styles.tableRow}>
              <td style={styles.tableCell}>{service.name}</td>
              <td style={styles.tableCell}>{service.address}</td>
              <td style={styles.tableCell}>{service.recipientName}</td>
              <td style={styles.tableCell}>{service.gender}</td>
              <td style={styles.tableCell}>
                {service.status === "esperando proveedor" ? (
                  <>
                    <Button
                      onClick={() =>
                        updateServiceStatus(service.id, "en progreso")
                      }
                      color="primary"
                      width="100px"
                    >
                      Aceptar
                    </Button>
                    <div style={{ width: "10px", display: "inline-block" }} />
                    <Button
                      onClick={() =>
                        updateServiceStatus(service.id, "rechazado")
                      }
                      color="danger"
                      width="100px"
                    >
                      Rechazar
                    </Button>
                  </>
                ) : service.status === "en progreso" ? (
                  <>
                    <textarea
                      placeholder="Describe el suceso..."
                      value={descriptions[service.id] || ""}
                      onChange={(e) =>
                        handleDescriptionChange(service.id, e.target.value)
                      }
                      style={styles.textarea}
                    />
                    <Button
                      onClick={() =>
                        updateServiceStatus(service.id, "completado")
                      }
                      color="secondary"
                      width="100px"
                    >
                      Completar
                    </Button>
                  </>
                ) : (
                  service.status.charAt(0).toUpperCase() +
                  service.status.slice(1)
                )}
              </td>
              <td style={styles.tableCell}>
                {service.status === "completado" && service.evaluation
                  ? `${parseInt(service.evaluation, 10)}`
                  : "No evaluado"}
              </td>
              <td style={styles.tableCell}>
                {service.status === "completado"
                  ? service.description || "No disponible"
                  : "N/A"}
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
  earningsMessage: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "green",
    textAlign: "center",
    marginBottom: "20px",
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
  textarea: {
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
    fontSize: "14px",
    resize: "none",
  },
};

export default ProviderDashboard;
