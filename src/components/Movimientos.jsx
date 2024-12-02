import React, { useState, useEffect } from "react";
import axios from "../configurations/axios"; // Asegúrate de tener configurado axios
import "../styles/Movimientos.css";

const Movimientos = () => {
  const [movements, setMovements] = useState([]);

  // Fetch movements from the backend
  useEffect(() => {
    const fetchMovements = async () => {
      try {
        const response = await axios.get("/movimientos");
        setMovements(response.data);
      } catch (err) {
        console.error("Error al obtener movimientos", err);
      }
    };

    fetchMovements();
  }, []);

  return (
    <div className="movimientos-container">
      <h2>Gestión de Movimientos</h2>
      <div className="movement-list">
        {movements.length > 0 ? (
          movements.map((movement) => (
            <div key={movement.id} className="movement-card">
              <h3>Producto ID: {movement.product_id}</h3>
              <p>Tipo de Movimiento: {movement.movement_type}</p>
              <p>Cantidad: {movement.quantity}</p>
            </div>
          ))
        ) : (
          <p>No hay movimientos disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default Movimientos;
