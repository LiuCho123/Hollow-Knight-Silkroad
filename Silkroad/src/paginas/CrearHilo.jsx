import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function CrearHilo() {
    const [titulo, setTitulo] = useState("");
    const [contenido, setContenido] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const hilos = JSON.parse(localStorage.getItem("hilos")) || [];

        const nuevoHilo = {
            id: Date.now(),
            titulo: titulo,
            autor: "LiuCho",
            respuestas: 0,
            ultimoMensaje: {
                autor: "LiuCho",
                fecha: new Date().toISOString()
            },
            mensajes: [{
                id: Date.now(),
                autor: "UsuarioX",
                contenido: contenido,
                fecha: new Date().toISOString()
            }]
        };

        hilos.push(nuevoHilo);
        localStorage.setItem("hilos", JSON.stringify(hilos));

        navigate("/foro");
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
                        <button type="submit" className="btn btn-lg btn-outline-light w-100 mt-3 boton-hollow">
                            Publicar hilo
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}

export default CrearHilo;