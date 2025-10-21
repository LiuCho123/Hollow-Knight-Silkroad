import React, {useState} from 'react';
import { preguntasTrivia } from '../data/preguntasTrivia';

function Trivia(){
    const [preguntaActualIndex, setPreguntaActualIndex] = useState(0);
    const [puntaje, setPuntaje] = useState(0);
    const [juegoTerminado, setJuegoTerminado] = useState(null);
    const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);

    const preguntaActual = preguntasTrivia[preguntaActualIndex];

    const handleRespuestaClick = (opcion) => {
        setRespuestaSeleccionada(opcion);

        if (opcion === preguntaActual.respuestaCorrecta){
            setPuntaje(puntaje + 1);
        }

        setTimeout(() => {
            const siguientePreguntaIndex = preguntaActualIndex + 1;
            if (siguientePreguntaIndex < preguntasTrivia.length){
                setPreguntaActualIndex(siguientePreguntaIndex);
                setRespuestaSeleccionada(null);
            } else{
                setJuegoTerminado(true);
            }
        }, 1500);
    };

    const handleReiniciar = () =>{
        setPreguntaActualIndex(0);
        setPuntaje(0);
        setJuegoTerminado(false);
        setRespuestaSeleccionada(null);
    };

    const obtenerClaseBoton = (opcion) => {
        if (respuestaSeleccionada){
            if (opcion === preguntaActual.respuestaCorrecta){
                return "correcta";
            }
            if (opcion === respuestaSeleccionada){
                return "incorrecta";
            }
        }
        return "";
    };

    return (
        <main className="container my-5">
            <div className="trivia-container">
                {juegoTerminado ? (
                    <div className="text-center">
                        <h2>¡Trivia completada!</h2>
                        <p className="display-4">
                            Obtuviste {puntaje} de {preguntasTrivia.length} respuestas correctas.
                        </p>
                        <button onClick={handleReiniciar} className="btn btn-lg btn-outline-light boton-hollow">
                            Jugar de nuevo
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="text-white-50">Pregunta {preguntaActualIndex + 1} de {preguntasTrivia.length}</div>
                        <h2 id="pregunta-trivia" className="my-4">{preguntaActual.pregunta}</h2>
                        <div className="d-grid gap-3">
                            {preguntaActual.opciones.map((opcion, index) => (
                                <button
                                    key={index}
                                    className={`btn btn-respuesta ${obtenerClaseBoton(opcion)}`}
                                    onClick={() => handleRespuestaClick(opcion)}
                                    disabled={respuestaSeleccionada !== null} 
                                >
                                    {opcion}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}

export default Trivia;