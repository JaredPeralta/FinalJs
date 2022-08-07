import React from 'react'
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CrearEstudiante = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [name, setName] = useState('');
  const [apellido, setApellido] = useState('');
  //let navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/mestudiante')
      .then(res => res.json())
      .then(data => {
        setEstudiantes(data);
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
    fetch('http://localhost:5000/api/estudiante', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombre: name,
        apellido: apellido
      })
    })
    window.location.reload()
  }

  const handleDelete = (id) => {
    //console.log(id);
    fetch('http://localhost:5000/api/estudiante', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        codigo: parseInt(id),
      })
    });
    window.location.reload()
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
          {estudiantes ?
            estudiantes.map(estudiante => {
              return (
                <tr key={estudiante.codigo}>
                  <td>{estudiante.codigo}</td>
                  <td>{estudiante.nombre}</td>
                  <td>{estudiante.apellido}</td>
                  <td>{estudiante.materias.map(mat => {
                    return (
                      <span>{mat.id} </span>
                    )
                  })}</td>
                  <td>
                    <Link to={{ pathname: `/estudiantes/${estudiante.codigo}` }}><button>Editar</button></Link>
                    <button onClick={() => handleDelete(estudiante.codigo)}>Eliminar</button>
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