import React, { useState, useEffect } from "react";
import axios from "../configurations/axios"; // Asegúrate de tener configurado axios
import "../styles/Usuarios.css";

const Usuarios = () => {
  const [users, setUsers] = useState([]);

  // Fetch users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/users");
        setUsers(response.data);
      } catch (err) {
        console.error("Error al obtener usuarios", err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="usuarios-container">
      <h2>Gestión de Usuarios</h2>
      <div className="user-list">
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user.id} className="user-card">
              <h3>{user.username}</h3>
              <p>Email: {user.email}</p>
            </div>
          ))
        ) : (
          <p>No hay usuarios disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default Usuarios;
