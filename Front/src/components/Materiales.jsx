import React, { useState, useEffect } from "react";
import axios from "../configurations/axios"; // Asegúrate de tener configurado axios
import "../styles/Materiales.css";
import { FaEdit, FaTrash } from "react-icons/fa"; // Importa los iconos de react-icons

const Materiales = () => {
  const [materials, setMaterials] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editMaterial, setEditMaterial] = useState({
    id: "",
    material_name: "",
  });
  const [newMaterial, setNewMaterial] = useState({
    material_name: "",
  });

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

  // Función para manejar la creación de un material
  const handleCreateMaterial = async () => {
    try {
      const response = await axios.post("/materials", newMaterial);
      setMaterials([...materials, response.data]);
      setNewMaterial({
        material_name: "",
      });
      setIsCreating(false);
    } catch (err) {
      console.error("Error al crear material", err);
    }
  };

  // Función para manejar la edición de un material
  const handleEditMaterial = async () => {
    try {
      const response = await axios.put(
        `/materials/${editMaterial.id}`,
        editMaterial
      );
      setMaterials(
        materials.map((material) =>
          material.id === editMaterial.id ? response.data : material
        )
      );
      setIsEditing(false);
      setEditMaterial({
        id: "",
        material_name: "",
      });
    } catch (err) {
      console.error("Error al actualizar material", err);
    }
  };

  // Función para cargar los datos del material en el formulario de edición
  const startEditing = (material) => {
    setEditMaterial(material);
    setIsEditing(true);
  };

  return (
    <div className="materiales-container">
      <h2>Gestión de Materiales</h2>

      {/* Botón para crear nuevo material */}
      <button onClick={() => setIsCreating(true)} className="create-button">
        Crear Material
      </button>

      {/* Formulario de creación de material */}
      {isCreating && (
        <div className="create-form">
          <h3>Nuevo Material</h3>
          <input
            type="text"
            placeholder="Nombre del Material"
            value={newMaterial.material_name}
            onChange={(e) =>
              setNewMaterial({ ...newMaterial, material_name: e.target.value })
            }
          ></input>
          <button onClick={handleCreateMaterial}>Guardar</button>
          <button onClick={() => setIsCreating(false)}>Cancelar</button>
        </div>
      )}

      {/* Formulario de edición de material */}
      {isEditing && (
        <div className="create-form">
          <h3>Editar Material</h3>
          <input
            type="text"
            placeholder="Nombre de Material"
            value={editMaterial.material_name}
            onChange={(e) =>
              setEditMaterial({
                ...editMaterial,
                material_name: e.target.value,
              })
            }
          />
          <button onClick={handleEditMaterial}>Actualizar</button>
          <button onClick={() => setIsEditing(false)}>Cancelar</button>
        </div>
      )}

      <div className="material-list">
        {materials.length > 0 ? (
          materials.map((material) => (
            <div key={material.id} className="material-card">
              <h3>{material.material_name}</h3>
              {/* Iconos para editar y eliminar */}
              <div className="material-actions">
                <FaEdit onClick={() => startEditing(material)} />
              </div>
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
