import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function InicioSesion() {
    const [identifier, setIdentifier] = useState(''); 
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        setError('');

        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        const usuarioEncontrado = usuarios.find(user =>
            (user.email === identifier || user.username === identifier) &&
            user.password === password
        );

        if (usuarioEncontrado) {
            alert("¡Inicio de sesión exitoso!");
            navigate("/foro"); 
        } else {
            setError("Usuario o contraseña incorrectos");
        }
    };

    const handleShowPassword = () => {
        setShowPassword(true);
        setTimeout(() => {
            setShowPassword(false);
        }, 3000);
    };

    return (
        <div className="body-main">
            <header className="return-main">
                <Link to="/">
                    <img src="/img/volver.png" alt="Volver al inicio" width="180" />
                </Link>
            </header>

            <main className="inicioSesion">
                <h1>Iniciar sesión</h1>
                {error && <div className="mensaje-error">{error}</div>}

                <form id="loginForm" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="userInput" className="form-label">Nombre de Usuario o Correo</label>
                        <div className="inputIcon">
                            <input
                                type="text"
                                className="form-control"
                                id="userInput"
                                placeholder="Ingrese su nombre de usuario / correo"
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                                required
                            />
                            <img src="/img/icon.png" alt="Icono de usuario" />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="passwordInput" className="form-label">Contraseña</label>
                        <div className="inputIcon">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-control"
                                id="passwordInput"
                                placeholder="Ingrese su contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <img
                                src="/img/ojo-cerrado.png"
                                id="togglePasswordLogin"
                                className="toggle-password-icon"
                                alt="Mostrar/Ocultar contraseña"
                                onClick={handleShowPassword}
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-lg btn-outline-light w-100 mt-4 boton-hollow">Iniciar sesion</button>

                    <div className="text-center mt-3">
                        <Link to="/olvidePassword" className="link-blue">¿Olvidaste tu contraseña?</Link>
                    </div>
                    <div className="text-center mt-3">
                        <Link to="/registro" className="link-blue">¿No tienes cuenta? ¡Regístrate!</Link>
                    </div>
                </form>
            </main>
        </div>
    );
}

export default InicioSesion;