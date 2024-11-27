import React, { useState, useEffect } from 'react';
import axios from '../configurations/axios';

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
        <div>
            <h2>Dashboard</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <h3>Productos</h3>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.product_code} - {product.description}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
