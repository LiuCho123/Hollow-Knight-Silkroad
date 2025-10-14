import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const api_url = "http://demo0658844.mockable.io";

function CrearHilo() {
    const [titulo, setTitulo] = useState("");
    const [contenido, setContenido] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const nuevoHilo = {
                id: Date.now(),
                titulo: titulo,
                autor: "LiuCho", // Tu nombre de autor
                respuestas: 0,
                ultimoMensaje: {
                    autor: "LiuCho",
                    fecha: new Date().toISOString()
                },
                mensajes: [{
                    id: Date.now(),
                    autor: "LiuCho",
                    contenido: contenido,
                    fecha: new Date().toISOString()
                }]
            };

            const response = await fetch(`${api_url}/hilos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevoHilo)
            });

            if (!response.ok) {
                throw new Error("No se pudo crear el hilo")
            }
            navigate("/foro");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="body-main">
            <header className="return-main">
                <Link to="/foro">
                    <img src="/img/volver.png" alt="Volver al foro" />
                </Link>
            </header>

            <main className="container my-5">
                <div className="foro-container">
                    <h1>Crear un nuevo hilo</h1>
                    {error && <p className="mensaje-error">{error}</p>}
                    <hr className="my-4" style={{ borderColor: '#a19595' }} />

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="tituloHilo" className="form-label">Título del hilo</label>
                            <input
                                type="text"
                                className="form-control"
                                id="tituloHilo"
                                value={titulo}
                                onChange={(e) => setTitulo(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="contenidoHilo" className="form-label">Mensaje</label>
                            <textarea
                                className="form-control"
                                id="contenidoHilo"
                                rows="8"
                                value={contenido}
                                onChange={(e) => setContenido(e.target.value)}
                                required>
                            </textarea>
                        </div>
                        <button type="submit" className="btn btn-lg btn-outline-light w-100 mt-3 boton-hollow" disabled={loading}>
                            {loading ? 'Publicando...' : 'Publicar hilo'}
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}

export default CrearHilo;