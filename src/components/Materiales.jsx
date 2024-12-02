import React, { useState, useEffect } from "react";
import axios from "../configurations/axios"; // Asegúrate de tener configurado axios
import "../styles/Materiales.css";

const Materiales = () => {
  const [materials, setMaterials] = useState([]);

  // Fetch materials from the backend
  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await axios.get("/materials");
        setMaterials(response.data);
      } catch (err) {
        console.error("Error al obtener materiales", err);
      }
    };

    fetchMaterials();
  }, []);

  return (
    <div className="materiales-container">
      <h2>Gestión de Materiales</h2>
      <div className="material-list">
        {materials.length > 0 ? (
          materials.map((material) => (
            <div key={material.id} className="material-card">
              <h3>{material.material_name}</h3>
            </div>
          ))
        ) : (
          <p>No hay materiales disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default Materiales;
