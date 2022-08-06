import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <h3>Administrador de Estudiantes</h3>
      <Link to="/estudiantes"><button>Estudiates</button></Link>
      <h3>Administrador de Materias</h3>
      <button>Crear Materia</button>
    </div>
  )
}

export default Home