import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Productos from "./components/Productos";
import Usuarios from "./components/Usuarios";
import Movimientos from "./components/Movimientos.jsx";
import Materiales from "./components/Materiales";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <Router>
      <div>
        <h1 style={{ textAlign: "center" }}>Gestión de Inventarios</h1>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="productos" element={<Productos />} />
            <Route path="usuarios" element={<Usuarios />} />
            <Route path="movimientos" element={<Movimientos />} />
            <Route path="materiales" element={<Materiales />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
