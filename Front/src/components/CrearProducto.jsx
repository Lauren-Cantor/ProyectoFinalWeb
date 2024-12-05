import React, { useState } from "react";
import axios from "../configurations/axios";
import { useNavigate } from "react-router-dom"; // Importamos useNavigate
import "../styles/CrearProducto.css";

const CrearProducto = () => {
  const [productCode, setProductCode] = useState("");
  const [description, setDescription] = useState("");
  const [initialPrice, setInitialPrice] = useState("");
  const [finalPrice, setFinalPrice] = useState("");
  const [weight, setWeight] = useState("");
  const [supplier, setSupplier] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // State para el mensaje de éxito
  const navigate = useNavigate();

  // Handle the form submit to create a product
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/productos", {
        product_code: productCode,
        description,
        initial_price: initialPrice,
        final_price: finalPrice,
        weight,
        supplier,
      });

      // Set success message and navigate to Dashboard after 2 seconds
      setSuccessMessage("Producto creado con éxito!");
      setTimeout(() => {
        navigate("/dashboard"); // Redirige al Dashboard
      }, 2000);
    } catch (err) {
      setError("Error al crear el producto");
    }
  };

  return (
    <div className="crear-producto-container">
      <h2 className="crear-producto-title">Crear Producto</h2>

      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      {/* Formulario para crear un producto */}
      <form onSubmit={handleCreateProduct} className="crear-producto-form">
        <div className="form-group">
          <label>Codigo de Producto</label>
          <input
            type="text"
            value={productCode}
            onChange={(e) => setProductCode(e.target.value)}
            placeholder="Código del producto"
            required
          />
        </div>

        <div className="form-group">
          <label>Descripción</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descripción del producto"
            required
          />
        </div>

        <div className="form-group">
          <label>Precio Inicial</label>
          <input
            type="number"
            value={initialPrice}
            onChange={(e) => setInitialPrice(e.target.value)}
            placeholder="Precio inicial"
            required
          />
        </div>

        <div className="form-group">
          <label>Precio Final</label>
          <input
            type="number"
            value={finalPrice}
            onChange={(e) => setFinalPrice(e.target.value)}
            placeholder="Precio final"
            required
          />
        </div>

        <div className="form-group">
          <label>Peso</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Peso del producto"
            required
          />
        </div>

        <div className="form-group">
          <label>Proveedor</label>
          <input
            type="text"
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
            placeholder="Proveedor"
            required
          />
        </div>

        <div className="form-buttons">
          <button type="submit" className="crear-producto-button">
            Crear Producto
          </button>
        </div>
      </form>

      {/* Botón para volver atrás */}
      <button className="back-button" onClick={() => navigate(-1)}>
        Volver Atrás
      </button>
    </div>
  );
};

export default CrearProducto;
