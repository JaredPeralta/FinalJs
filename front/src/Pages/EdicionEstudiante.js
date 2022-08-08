import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';

const EdicionEstudiante = () => {
  let navigate = useNavigate();
  let params = useParams();
  const [name, setName] = useState('');
  const [apellido, setApellido] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5000/api/estudiante?codigo=${params.id}`)
      .then(res => res.json())
      .then(data => {
        setName(data.nombre);
        setApellido(data.apellido);
        console.log(data.nombre);
        console.log("Hola "+ name);
      }
      );
  } , []);

  const handleChangeNombre = (e) => {
    setName(e.target.value);
  }

  const handleChangeApellido = (e) => {
    setApellido(e.target.value);
  }

  const handleEdit = () => {
    fetch('http://localhost:5000/api/estudiante/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        codigo : parseInt(params.id),
        nombre: name,
        apellido: apellido
      })
    })
    navigate("/estudiantes", { replace: true });
  }

  return (
    <div>
      <p>Nombre: <input onChange={handleChangeNombre}></input></p>
      <p>Apellido: <input onChange={handleChangeApellido}></input></p>
      <button onClick={handleEdit}>Actualizar Estudiante</button>
    </div>
  )
}

export default EdicionEstudiante