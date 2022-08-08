import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <h3>Administrador de Estudiantes</h3>
      <Link to="/estudiantes"><button>Estudiantes</button></Link>
      <h3>Administrador de Materias</h3>
      <Link to="/materias"><button>Materias</button></Link>
    </div>
  )
}

export default Home