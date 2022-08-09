import React from 'react'
import NavBar from '../Components/NavBar/NavBar'
import { Button } from 'react-bootstrap';

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
    alert('Datos cargados');
  }

  return (
    <div>
      <NavBar />
      <h1>Bienvenido</h1>
      <h5>Puede moverse con las opciones de la barra de navegacion para acceder al archivo predeterminado o cargar uno haciendo click en el boton "Cargar Datos"</h5>
      <Button onClick={handleCargarDatos}>Cargar Datos</Button>
    </div>
  )
}

export default Home