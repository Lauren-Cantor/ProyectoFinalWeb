import React, { useState } from 'react';
import axios from '../configurations/axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/login', {
                username,
                password,
            });
            localStorage.setItem('token', response.data.token); // Guarda el token
            navigate.push('/dashboard');
        } catch (err) {
            setError(err.response ? err.response.data.message : 'Error en el login');
        }
    };

    return (
        <div>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nombre de usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Iniciar sesión</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Login;
