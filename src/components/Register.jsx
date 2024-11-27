import React, { useState } from 'react';
import axios from '../configurations/axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('employee');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        // e.preventDefault();
        // try {
        //     const response = await axios.post('/register', {
        //         username,
        //         password,
        //         role,
        //     });
        //     console.log(response.data);
        //     alert('Usuario registrado con éxito');
        // } catch (err) {
        //     setError(err.response ? err.response.data.message : 'Error en el registro');
        // }
        console.log("evento: ", e);
        
    };

    return (
        <div>
            <h2>Registrar Usuario</h2>
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
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="employee">Empleado</option>
                    <option value="admin">Administrador</option>
                </select>
                <button type="submit">Registrar</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Register;
