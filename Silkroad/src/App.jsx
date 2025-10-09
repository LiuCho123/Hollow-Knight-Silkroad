import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './paginas/HomePage'
import Registro from './paginas/Registro';
import InicioSesion from './paginas/InicioSesion'
import OlvidePassword from './paginas/OlvidePassword';
import VerificarCodigo from './paginas/VerificarCodigo';
import RecuperarContraseña from './paginas/RecuperarPassword';
import Foro from './paginas/Foro';
import Layout from './Layout';
import CrearHilo from './paginas/CrearHilo';
import Hilo from './paginas/Hilo';
import Trivia from './paginas/Trivia';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/iniciosesion" element={<InicioSesion />} />
        <Route path="/olvidepassword" element={<OlvidePassword />} />
        <Route path="/verificarcodigo" element={<VerificarCodigo />} />
        <Route path="/recuperarpassword" element={<RecuperarContraseña />} />
        <Route path="/crear-hilo" element={<CrearHilo />} />
        <Route path="/hilo/:hiloId" element={<Hilo />} />



        <Route element={<Layout />}>
          <Route path="/foro" element={<Foro />} />
          <Route path="/trivia" element={<Trivia />} />
          <Route path="/checklist" element={<Foro />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
