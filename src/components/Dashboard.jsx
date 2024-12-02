import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../styles/Dashboard.css"; // Asegúrate de importar los estilos comunes

const Dashboard = () => {
  return (
    <div className="dashboard-wrapper">
      {/* Barra de Navegación a la izquierda */}
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
      </div>

      {/* Contenido Central */}
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
