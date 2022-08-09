import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import NavBar from '../Components/NavBar/NavBar';

const EdicionEstudiante = () => {
  let navigate = useNavigate();
  let params = useParams();
  const [name, setName] = useState('');
  const [apellido, setApellido] = useState('');
  const [estudiante, setEstudiante] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/estudiante?codigo=${params.id}`)
      .then(res => res.json())
      .then(data => {
        setEstudiante(data);
      }
      );
  } , []);

  const handleChangeNombre = (e) => {
    if (e.target.value === '') {
      setName(' ');
    }else {
      setName(e.target.value);
    }
  }

  const handleChangeApellido = (e) => {
    if (e.target.value === '') {
      setApellido(' ');
    }else {
      setApellido(e.target.value);
    }
  }

  const handleEdit = () => {
    switch (true) {
      case name === '' && apellido === '':
        fetch(`http://localhost:5000/api/estudiante`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            codigo: parseInt(params.id),
            nombre: estudiante.nombre,
            apellido: estudiante.apellido
          })
        })
        navigate('/estudiantes')
        break;
      case name === ' ' && apellido === ' ':
        alert('Debe ingresar un nombre y un apellido');
        break;
      case name === '' && apellido !== ' ':
        fetch(`http://localhost:5000/api/estudiante`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            codigo: parseInt(params.id),
            nombre: estudiante.nombre,
            apellido: apellido
          })
        })
        navigate('/estudiantes')
        break;
      case name !== ' ' && apellido === '':
        fetch(`http://localhost:5000/api/estudiante`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            codigo: parseInt(params.id),
            nombre: name,
            apellido: estudiante.apellido
          })
        })
        navigate('/estudiantes')
        break;
      case name !== ' ' && apellido !== ' ':
        fetch(`http://localhost:5000/api/estudiante`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            codigo: parseInt(params.id),
            nombre: name,
            apellido: apellido
          })
        })
        navigate('/estudiantes')
        break;
        case name === ' ' && apellido !== ' ':
          alert('Debe ingresar un nombre y un apellido');
          break;
        case name !== ' ' && apellido === ' ':
          alert('Debe ingresar un nombre y un apellido');
          break;
      default:
        alert('Debe ingresar un nombre y un apellido');
    }
  }
  
  return (
    <div>
      <NavBar />
      {estudiante ? 
          <>
            <p>Nombre: <input value={name ? name : estudiante.nombre} onChange={handleChangeNombre}></input></p>
            <p>Apellido: <input value={apellido ? apellido : estudiante.apellido} onChange={handleChangeApellido}></input></p>
            <Button onClick={handleEdit}>Actualizar Estudiante</Button>
          </>
      : <h1>Cargando...</h1>}
    </div>
  )
}

export default EdicionEstudiante