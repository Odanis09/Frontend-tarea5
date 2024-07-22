import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [contactos, setContactos] = useState([]);
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');

    // Obtener contactos
    const obtenerContactos = async () => {
        try {
            const response = await axios.get('http://localhost:3001/contactos');
            setContactos(response.data);
        } catch (error) {
            console.error("Error al obtener los contactos:", error);
        }
    };

    // Agregar contacto
    const agregarContacto = async (e) => {
        e.preventDefault();
        const nuevoContacto = { nombre, telefono };
        try {
            await axios.post('http://localhost:3001/contactos', nuevoContacto);
            setNombre('');
            setTelefono('');
            obtenerContactos();
        } catch (error) {
            console.error("Error al agregar el contacto:", error);
        }
    };

    useEffect(() => {
        obtenerContactos(); 
    }, []);

    return (
        <div>
            <h1>Agenda de Contactos</h1>
            <form onSubmit={agregarContacto}>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Teléfono"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    required
                />
                
                <button type="submit">Agregar</button>
            </form>
            <ul>
                {contactos.map((contacto, index) => (
                    <li key={index}>{contacto.nombre} - {contacto.telefono}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
