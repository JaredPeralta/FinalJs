import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

const CrearMateria = () => {
  const [materias, setMaterias] = useState([]);
  const [name, setName] = useState('');
  const [creditos, setCreditos] = useState('');
  const [tipo, setTipo] = useState('');
  useEffect(() => {
    fetch("http://localhost:5000/api/mmaterias")
      .then(res => res.json())
      .then(data => {
        setMaterias(data);
        console.log(data);
      }
      );
  }, []);

  const handleChangeNombre = (e) => {
    setName(e.target.value);
  }

  const handleChangeTipo = (e) => {
    setTipo(e.target.value);
  }

  const handleChangeCreditos = (e) => {
    setCreditos(e.target.value);
  }

  const add = () => {
    fetch('http://localhost:5000/api/materia', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombre: name,
        creditos: parseInt(creditos),
        tipo: tipo
      })
    })
    window.location.reload()
  }

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/materia`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: parseInt(id)
      })
    })
    window.location.reload()
  }


  return (
    <div>
      <p>Nombre: <input onChange={handleChangeNombre}></input></p>
      <p>Creditos: <input onChange={handleChangeCreditos}></input></p>
      <p>Tipo: <input onChange={handleChangeTipo}></input></p>
      <button onClick={add}>Agregar Materia</button>
      

      <table border="1">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Creditos</th>
            <th>Tipo</th>
            <th>EstudiantesInscritos</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {materias ?
            materias.map(materia => {
              return (
                <tr key={materia.id}>
                  <td>{materia.id}</td>
                  <td>{materia.nombre}</td>
                  <td>{materia.creditos}</td>
                  <td>{materia.tipo}</td>
                  <td>{materia.estudiantesInscritos.map(est => {
                    return (
                      <span key={est.codigo}>{est.codigo} </span>
                    )
                  })}</td>
                  <td>
                    <Link to={{ pathname: `/materias/${materia.id}` }}><button>Editar</button></Link>
                    <button onClick={() => handleDelete(materia.id)}>Eliminar</button>
                  </td>
                </tr>
              );
            })
            : <h1>Cargando...</h1>}
        </tbody>
      </table>
    </div>
  );
}

export default CrearMateria;