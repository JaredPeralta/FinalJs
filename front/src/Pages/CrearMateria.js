import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import NavBar from '../Components/NavBar/NavBar';
import { Button , Table } from 'react-bootstrap';

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
    if (name === '' || creditos === '' || tipo === '') {
      alert('Debe ingresar un nombre, un tipo y un numero de creditos');
    } else {
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
      <NavBar />
      <p>Nombre: <input onChange={handleChangeNombre}></input></p>
      <p>Creditos: <input onChange={handleChangeCreditos}></input></p>
      <p>Tipo: <input onChange={handleChangeTipo}></input></p>
      <Button onClick={add}>Agregar Materia</Button>
      

      <Table striped bordered hover size="sm">
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
                  <td>{materia.tipo === 't' ? "Teorico" : "Teorico-Practico"}</td>
                  <td>{materia.estudiantesInscritos.map(est => {
                    return (
                      <span key={est.codigo}>{est.codigo} </span>
                    )
                  })}</td>
                  <td>
                    <Link to={{ pathname: `/materias/ver/${materia.id}` }}><Button variant="outline-primary">Ver materia</Button></Link>
                    <Link to={{ pathname: `/materias/${materia.id}` }}><Button variant="outline-warning">Editar</Button></Link>
                    <Button variant="outline-danger" onClick={() => handleDelete(materia.id)}>Eliminar</Button>
                  </td>
                </tr>
              );
            })
            : <h1>Cargando...</h1>}
        </tbody>
      </Table>
    </div>
  );
}

export default CrearMateria;