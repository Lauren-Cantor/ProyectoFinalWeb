import React, { useState, useEffect } from 'react';
import axios from '../configurations/axios';
import '../styles/Dashboard.css'

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/productos');
                setProducts(response.data);
            } catch (err) {
                setError('Error al obtener productos');
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="dashboard-container">
            <h2 className="dashboard-title">Dashboard</h2>
            {error && <p className="error-message">{error}</p>}
            <h3 className="dashboard-title">Productos</h3>
            <ul className="product-list">
                {products.map((product) => (
                    <li key={product.id} className="product-list-item">
                        {product.product_code} - {product.description}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
