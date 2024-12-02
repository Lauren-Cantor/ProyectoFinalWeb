import React, { useState, useEffect } from "react";
import axios from "../configurations/axios";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/ActualizarProducto.css"; // Asegúrate de tener los estilos adecuados

const ActualizarProducto = () => {
  const { id } = useParams(); // Obtiene el id del producto desde la URL
  const navigate = useNavigate(); // Hook de navegación para redirigir
  const [product, setProduct] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({
    description: "",
    material_id: "",
    initial_price: "",
    final_price: "",
    weight: "",
    supplier: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Obtener el producto actual al cargar la página
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/productos/${id}`);
        setProduct(response.data);
        setUpdatedProduct(response.data); // Establece los valores actuales para que el usuario pueda actualizarlos
      } catch (err) {
        setError("Error al obtener el producto");
      }
    };

    fetchProduct();
  }, [id]);

  // Manejo del cambio en los campos de formulario
  const handleChange = (e) => {
    setUpdatedProduct({
      ...updatedProduct,
      [e.target.name]: e.target.value,
    });
  };

  // Manejo de la actualización del producto
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`/productos/${id}`, updatedProduct);
      setMessage("Producto actualizado con éxito");

      // Después de 2 segundos redirigir al Dashboard
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000); // Espera 2 segundos para mostrar el mensaje
    } catch (err) {
      setError("Error al actualizar el producto");
    }
  };

  if (!product) return <div>Cargando...</div>;

  return (
    <div className="update-product-container">
      <h2>Actualizar Producto</h2>
      {error && <p className="error-message">{error}</p>}
      {message && <p className="success-message">{message}</p>}

      <form onSubmit={handleUpdate} className="update-product-form">
        <input
          type="text"
          name="description"
          value={updatedProduct.description}
          onChange={handleChange}
          placeholder="Descripción"
        />
        <input
          type="text"
          name="material_id"
          value={updatedProduct.material_id}
          onChange={handleChange}
          placeholder="ID Material"
        />
        <input
          type="number"
          name="initial_price"
          value={updatedProduct.initial_price}
          onChange={handleChange}
          placeholder="Precio Inicial"
        />
        <input
          type="number"
          name="final_price"
          value={updatedProduct.final_price}
          onChange={handleChange}
          placeholder="Precio Final"
        />
        <input
          type="number"
          name="weight"
          value={updatedProduct.weight}
          onChange={handleChange}
          placeholder="Peso"
        />
        <input
          type="text"
          name="supplier"
          value={updatedProduct.supplier}
          onChange={handleChange}
          placeholder="Proveedor"
        />
        <button type="submit">Actualizar Producto</button>
      </form>

      <button className="back-button" onClick={() => navigate("/dashboard")}>
        Volver al Dashboard
      </button>
    </div>
  );
};

export default ActualizarProducto;
