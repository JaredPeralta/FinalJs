import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

const Home = () => {
  const handleCargarDatos = () => {
    fetch('http://localhost:5000/api/backup', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      });
  }

  return (
    <div>
      <h3>Administrador de Estudiantes</h3>
      <Link to="/estudiantes"><button>Estudiantes</button></Link>
      <h3>Administrador de Materias</h3>
      <Link to="/materias"><button>Materias</button></Link>
      <button onClick={handleCargarDatos}>Cargar Datos</button>
    </div>
  )
}

export default Home