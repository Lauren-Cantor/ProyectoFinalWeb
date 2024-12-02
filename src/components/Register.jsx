import React, { useState } from "react";
import axios from "../configurations/axios";
import "../styles/Register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/register", {
        username,
        password,
        role,
      });
      console.log(response.data);
      alert("Usuario registrado con éxito");
    } catch (err) {
      setError(
        err.response ? err.response.data.message : "Error en el registro"
      );
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Registro de Usuario</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input-field"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="input-field"
        >
          <option value="employee">Empleado</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="submit-button">
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Register;
