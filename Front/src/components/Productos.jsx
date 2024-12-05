import React, { useState, useEffect } from "react";
import axios from "../configurations/axios"; // Asegúrate de tener configurado axios
import "../styles/Productos.css";
import { FaEdit, FaTrash } from "react-icons/fa"; // Importa los iconos de react-icons

const Productos = () => {
  const [products, setProducts] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editProduct, setEditProduct] = useState({
    id: "",
    product_code: "",
    description: "",
    material_id: "",
    initial_price: "",
    final_price: "",
    weight: "",
    supplier: "",
  });
  const [newProduct, setNewProduct] = useState({
    product_code: "",
    description: "",
    material_id: "",
    initial_price: "",
    final_price: "",
    weight: "",
    supplier: "",
  });

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

  // Función para manejar la creación de un producto
  const handleCreateProduct = async () => {
    try {
      const response = await axios.post("/productos", newProduct);
      setProducts([...products, response.data]);
      setNewProduct({
        product_code: "",
        description: "",
        material_id: "",
        initial_price: "",
        final_price: "",
        weight: "",
        supplier: "",
      });
      setIsCreating(false);
    } catch (err) {
      console.error("Error al crear producto", err);
    }
  };

  // Función para manejar la edición de un producto
  const handleEditProduct = async () => {
    try {
      const response = await axios.put(
        `/productos/${editProduct.id}`,
        editProduct
      );
      setProducts(
        products.map((product) =>
          product.id === editProduct.id ? response.data : product
        )
      );
      setIsEditing(false);
      setEditProduct({
        id: "",
        product_code: "",
        description: "",
        material_id: "",
        initial_price: "",
        final_price: "",
        weight: "",
        supplier: "",
      });
    } catch (err) {
      console.error("Error al actualizar producto", err);
    }
  };

  // Función para eliminar un producto
  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`/productos/${id}`);
      setProducts(products.filter((product) => product.id !== id));
    } catch (err) {
      console.error("Error al eliminar producto", err);
    }
  };

  // Función para cargar los datos del producto en el formulario de edición
  const startEditing = (product) => {
    setEditProduct(product);
    setIsEditing(true);
  };

  return (
    <div className="productos-container">
      <h2>Gestión de Productos</h2>

      {/* Botón para crear nuevo producto */}
      <button onClick={() => setIsCreating(true)} className="create-button">
        Crear Producto
      </button>

      {/* Formulario de creación de producto */}
      {isCreating && (
        <div className="create-form">
          <h3>Nuevo Producto</h3>
          <input
            type="text"
            placeholder="Código de Producto"
            value={newProduct.product_code}
            onChange={(e) =>
              setNewProduct({ ...newProduct, product_code: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Descripción"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="ID de Material"
            value={newProduct.material_id}
            onChange={(e) =>
              setNewProduct({ ...newProduct, material_id: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Precio Inicial"
            value={newProduct.initial_price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, initial_price: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Precio Final"
            value={newProduct.final_price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, final_price: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Peso"
            value={newProduct.weight}
            onChange={(e) =>
              setNewProduct({ ...newProduct, weight: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Proveedor"
            value={newProduct.supplier}
            onChange={(e) =>
              setNewProduct({ ...newProduct, supplier: e.target.value })
            }
          />
          <button onClick={handleCreateProduct}>Guardar</button>
          <button onClick={() => setIsCreating(false)}>Cancelar</button>
        </div>
      )}

      {/* Formulario de edición de producto */}
      {isEditing && (
        <div className="create-form">
          <h3>Editar Producto</h3>
          <input
            type="text"
            placeholder="Código de Producto"
            value={editProduct.product_code}
            onChange={(e) =>
              setEditProduct({ ...editProduct, product_code: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Descripción"
            value={editProduct.description}
            onChange={(e) =>
              setEditProduct({ ...editProduct, description: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="ID de Material"
            value={editProduct.material_id}
            onChange={(e) =>
              setEditProduct({ ...editProduct, material_id: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Precio Inicial"
            value={editProduct.initial_price}
            onChange={(e) =>
              setEditProduct({ ...editProduct, initial_price: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Precio Final"
            value={editProduct.final_price}
            onChange={(e) =>
              setEditProduct({ ...editProduct, final_price: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Peso"
            value={editProduct.weight}
            onChange={(e) =>
              setEditProduct({ ...editProduct, weight: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Proveedor"
            value={editProduct.supplier}
            onChange={(e) =>
              setEditProduct({ ...editProduct, supplier: e.target.value })
            }
          />
          <button onClick={handleEditProduct}>Actualizar</button>
          <button onClick={() => setIsEditing(false)}>Cancelar</button>
        </div>
      )}

      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="product-card">
              <h3>{product.description}</h3>
              <p>Código: {product.product_code}</p>
              <p>Precio: ${product.final_price}</p>

              {/* Iconos para editar y eliminar */}
              <div className="product-actions">
                <FaEdit onClick={() => startEditing(product)} />
                <FaTrash onClick={() => handleDeleteProduct(product.id)} />
              </div>
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
