import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "../styles/Dashboard.css"; // Asegúrate de importar los estilos comunes

const Dashboard = () => {
  const navigate = useNavigate();

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    // Elimina el token o cualquier dato de sesión almacenado (localStorage, cookies, etc.)
    localStorage.removeItem("authToken"); // Esto depende de cómo estés manejando la autenticación

    // Redirige al usuario a la página de inicio de sesión
    navigate("/login");
  };

  return (
    <div className="dashboard-wrapper">
      {/* Barra de Navegación */}
      <div className="dashboard-nav">
        <ul>
          <li>
            <Link to="/dashboard/productos" className="nav-link">
              Productos
            </Link>
          </li>
          <li>
            <Link to="/dashboard/usuarios" className="nav-link">
              Usuarios
            </Link>
          </li>
          <li>
            <Link to="/dashboard/movimientos" className="nav-link">
              Movimientos
            </Link>
          </li>
          <li>
            <Link to="/dashboard/materiales" className="nav-link">
              Materiales
            </Link>
          </li>
        </ul>

        {/* Botón de Cerrar Sesión */}
        <button className="section-button" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>

      {/* Contenido Central */}
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
