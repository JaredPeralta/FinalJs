import React from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react';

const EdicionEstudiante = () => {
  let params = useParams();
  const [name, setName] = useState('');
  const [apellido, setApellido] = useState('');

  const handleChangeNombre = (e) => {
    setName(e.target.value);
  }

  const handleChangeApellido = (e) => {
    setApellido(e.target.value);
  }

  const handleEdit = () => {
    fetch('http://localhost:5000/api/usuario/', {
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
  }

  return (
    <div>
      <p>Nombre: <input onChange={handleChangeNombre}></input></p>
      <p>Apellido: <input onChange={handleChangeApellido}></input></p>
      <button onClick={handleEdit}>Add</button>
    </div>
  )
}

export default EdicionEstudiante