import React from "react";
import { useState } from "react";
import { useParams, useNavigate } from 'react-router-dom'

const EdicionMateria = () => {
  let navigate = useNavigate();
  let params = useParams();
  const [name, setName] = useState('');
  const [creditos, setCreditos] = useState('');

  const handleChangeNombre = (e) => {
    setName(e.target.value);
  }

  const handleChangeCreditos = (e) => {
    setCreditos(e.target.value);
  }

  const handleEdit = () => {
    fetch('http://localhost:5000/api/materia/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id : parseInt(params.id),
        nombre: name,
        creditos: parseInt(creditos)
      })
    })
    console.log(typeof(params.id));
    navigate("/materias", { replace: true });
  }

  return (
    <div>
      <p>Nombre: <input onChange={handleChangeNombre}></input></p>
      <p>Creditos: <input onChange={handleChangeCreditos}></input></p>
      <button onClick={handleEdit}>Actualizar Materia</button>
    </div>
  );
}
export default EdicionMateria;