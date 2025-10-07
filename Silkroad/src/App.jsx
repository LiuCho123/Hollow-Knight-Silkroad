import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
//import MainLayout from './components/MainLayout'
//import AuthLayout from './components/AuthLayout'
import HomePage from './paginas/HomePage'
import Registro from './paginas/Registro';
import InicioSesion from './paginas/InicioSesion'
import OlvidePassword from './paginas/OlvidePassword';
import VerificarCodigo from './paginas/VerificarCodigo';
import RecuperarContraseña from './paginas/RecuperarPassword';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>

        <Route path="/registro" element={<Registro/>}/>    

        <Route path="/iniciosesion" element={<InicioSesion/>}/>   

        <Route path="/olvidepassword" element={<OlvidePassword/>}/> 

        <Route path="/verificarcodigo" element={<VerificarCodigo/>}/>

        <Route path="/recuperarpassword" element={<RecuperarContraseña/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App
