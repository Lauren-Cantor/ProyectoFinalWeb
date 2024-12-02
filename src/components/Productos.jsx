import React, { useState, useEffect } from "react";
import axios from "../configurations/axios"; // Asegúrate de tener configurado axios
import "../styles/Productos.css";

const Productos = () => {
  const [products, setProducts] = useState([]);

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/productos");
        setProducts(response.data);
      } catch (err) {
        console.error("Error al obtener productos", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="productos-container">
      <h2>Gestión de Productos</h2>
      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="product-card">
              <h3>{product.description}</h3>
              <p>Código: {product.product_code}</p>
              <p>Precio: ${product.final_price}</p>
            </div>
          ))
        ) : (
          <p>No hay productos disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default Productos;
