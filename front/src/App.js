//import { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route} from "react-router-dom";
import CrearEstudiante from './Pages/CrearEstudiante';
import Home  from './Pages/Home';
import EdicionEstudiante from './Pages/EdicionEstudiante';
import CrearMateria from './Pages/CrearMateria';
import EdicionMateria from './Pages/EdicionMateria';
import VerMateria from './Pages/VerMateria';
import ModificarNotas from './Pages/ModificarNotas';


const App = () => {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="estudiantes" element={<CrearEstudiante />} />
        <Route path="estudiantes/:id" element={<EdicionEstudiante/>} />
        <Route path="materias" element={<CrearMateria/>} />
        <Route path="materias/:id" element={<EdicionMateria/>} />
        <Route path="materias/ver/:id" element={<VerMateria/>} />
        <Route path="materias/modificar/:idMateria/:idEstudiante" element={<ModificarNotas/>} />
      </Routes>
    </div>
  );
}

export default App;
