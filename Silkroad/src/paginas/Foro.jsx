import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const api_url = "http://demo0658844.mockable.io";

function Foro() {
    const [hilos, setHilos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHilos = async () => {
            try {
                const response = await fetch(`${api_url}/hilos`);
                if (!response.ok) {
                    throw new Error("No se pudieron cargar los hilos");
                }
                const data = await response.json();
                setHilos(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHilos();
    }, []);

    const formatearFecha = (fechaISO) => {
        const fecha = new Date(fechaISO);
        return fecha.toLocaleDateString('es-ES', {
            day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };

    return (
        <main className="container my-5">
            {loading && <p className="text-white text-center">Cargando hilos...</p>}
            {error && <p className="text-danger text-center">Error: {error}</p>}

            {!loading && !error && (
                <div className="foro-container">
                    <div className="foro-header">
                        <h1>Foro de Hallownest</h1>
                        <Link to="/crear-hilo" className="btn btn-lg btn-outline-light boton-hollow">
                            Crear nuevo hilo
                        </Link>
                    </div>

                    <table className="tabla-hilos">
                        <thead>
                            <tr>
                                <th>Tema</th>
                                <th>Autor</th>
                                <th>Respuestas</th>
                                <th>Últimos posts</th>
                            </tr>
                        </thead>
                        <tbody>
                            {hilos.map(hilo => (
                                <tr key={hilo.id}>
                                    <td>
                                        <Link to={`/hilo/${hilo.id}`}>{hilo.titulo}</Link>
                                    </td>
                                    <td>{hilo.autor}</td>
                                    <td>{hilo.respuestas}</td>
                                    <td>
                                        por {hilo.ultimoMensaje.autor} <br />
                                        <small>{formatearFecha(hilo.ultimoMensaje.fecha)}</small>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </main>
    );
}

export default Foro;