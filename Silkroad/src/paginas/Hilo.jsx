import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

function Hilo() {
    const { hiloId } = useParams();
    const navigate = useNavigate();

    const [hilo, setHilo] = useState(null);
    const [contenidoRespuesta, setContenidoRespuesta] = useState("");

    useEffect(() => {
        const hilos = JSON.parse(localStorage.getItem("hilos")) || [];
        const hilosDeEjemplo = JSON.parse(localStorage.getItem("hilosDeEjemplo")) || [];
        const hilosAMostrar = hilos.length > 0 ? hilos : hilosDeEjemplo;
        const hiloActual = hilosAMostrar.find(h => h.id === Number(hiloId));
        setHilo(hiloActual);
    }, [hiloId]);

    const handleReplySubmit = (event) => {
        event.preventDefault();
        if (contenidoRespuesta.trim() === "") return;

        const nuevaRespuesta = {
            id: Date.now(),
            autor: "UsuarioRespondiendo",
            contenido: contenidoRespuesta,
            fecha: new Date().toISOString()
        };

        const hilos = JSON.parse(localStorage.getItem("hilos")) || [];
        const hiloIndex = hilos.findIndex(h => h.id === Number(hiloId));

        if (hiloIndex !== -1) {
            const hiloActualizado = { ...hilos[hiloIndex] };
            hiloActualizado.mensajes.push(nuevaRespuesta);
            hiloActualizado.respuestas = hiloActualizado.mensajes.length - 1;
            hiloActualizado.ultimoMensaje = { autor: nuevaRespuesta.autor, fecha: nuevaRespuesta.fecha };

            hilos[hiloIndex] = hiloActualizado;
            localStorage.setItem("hilos", JSON.stringify(hilos));

            setHilo(hiloActualizado);
            setContenidoRespuesta("");
        }
    };

    const handleDelete = () => {
        if (window.confirm('¿Estás seguro que deseas eliminar este hilo?')) {
            const hilos = JSON.parse(localStorage.getItem("hilos")) || [];
            const hilosActualizados = hilos.filter(h => h.id !== Number(hiloId));
            localStorage.setItem("hilos", JSON.stringify(hilosActualizados));
            alert("El hilo ha sido eliminado con éxito");
            navigate("/foro");
        }
    };

    if (!hilo) {
        return <div className='container my-5 text-white'>Hilo no encontrado o cargando...</div>;
    }

    const mensajeOriginal = hilo.mensajes[0];
    const respuestas = hilo.mensajes.slice(1);

    return (
        <div className="body-main">
            <header className="return-main">
                <Link to="/foro">
                    <img src="/img/volver.png" alt="Volver al foro" />
                </Link>
            </header>
            <main className="container my-5">
                <div className="foro-container">
                    <div className="d-flex justify-content-between align-items-center">
                        <h1 className="mb-0">{hilo.titulo}</h1>
                        <button onClick={handleDelete} className="btn btn-outline-danger">Eliminar Hilo</button>
                    </div>
                    <hr className="my-4" />

                    <div className="post-original">
                        <div className="post-autor">{mensajeOriginal.autor}</div>
                        <div className="post-contenido">{mensajeOriginal.contenido}</div>
                        <div className="post-fecha">{new Date(mensajeOriginal.fecha).toLocaleString('es-ES')}</div>
                    </div>

                    {respuestas.map(respuesta => (
                        <div key={respuesta.id} className="post">
                            <div className="post-autor">{respuesta.autor}</div>
                            <div className="post-contenido">{respuesta.contenido}</div>
                            <div className="post-fecha">{new Date(respuesta.fecha).toLocaleString('es-ES')}</div>
                        </div>
                    ))}

                    <hr className="my-4" />

                    <form onSubmit={handleReplySubmit}>
                        <div className="mb-3">
                            <label htmlFor="contenidoRespuesta" className="form-label label-respuesta">Escribe una respuesta</label>
                            <textarea
                                className="form-control"
                                id="contenidoRespuesta"
                                rows="3"
                                value={contenidoRespuesta}
                                onChange={(e) => setContenidoRespuesta(e.target.value)}
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-lg btn-outline-light w-100 mt-3 boton-hollow">
                            Publicar respuesta
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}

export default Hilo;