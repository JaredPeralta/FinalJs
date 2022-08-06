import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CrearEstudiante = () => {
  const [datos, setDatos] = useState(null);
  const [name, setName] = useState('');
  const [apellido, setApellido] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/musuario') 
    .then(res => res.json()) 
    .then(data => {
      setDatos(data);
      console.log(data);
    }); 
  }, []);

  const handleChangeNombre = (e) => {
    setName(e.target.value);
  }

  const handleChangeApellido = (e) => {
    setApellido(e.target.value);
  }

  const add = () => {
    fetch('http://localhost:5000/api/usuario', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombre: name,
        apellido: apellido
      })
    })
  }

  const handleDelete = (id) => {
    console.log(id);
    fetch('http://localhost:5000/api/usuario', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        codigo: parseInt(id),
      })
    })
  }

  return (
    <div>
      <p>Nombre: <input onChange={handleChangeNombre}></input></p>
      <p>Apellido: <input onChange={handleChangeApellido}></input></p>
      <button onClick={add}>Add</button>

      <table border="1">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Apellido</th>
              <th>Materias</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {datos ? 
              datos.map(estudiantes => {
              return (
                <tr key={estudiantes.codigo}>
                  <td>{estudiantes.codigo}</td>
                  <td>{estudiantes.nombre}</td>
                  <td>{estudiantes.apellido}</td>
                  <td>{estudiantes.materias.map(mat => {
                    return (
                      <p>{mat.id}</p>
                    )
                  })}</td>
                  <td>
                    <Link to={{pathname: `/estudiantes/${estudiantes.codigo}`}}><button>Editar</button></Link>
                    <button onClick={() => handleDelete(estudiantes.codigo)}>Eliminar</button>
                  </td>
                </tr>
              );
            })
            : <h1>Cargando...</h1>}
          </tbody>
        </table>
    </div>
  )
}

export default CrearEstudiante