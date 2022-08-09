import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../Components/NavBar/NavBar';
import { Button , Table } from 'react-bootstrap';

const CrearEstudiante = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [name, setName] = useState('');
  const [apellido, setApellido] = useState('');
  const [estMejorProm, setEstMejorProm] = useState([]);
  const [estSinMaterias, setEstSinMaterias] = useState([]);
  const [verMejorProm, setVerMejorProm] = useState(false);
  const [verSinMaterias, setVerSinMaterias] = useState(false);
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
    if (name === '' || apellido === '') {
      alert('Debe ingresar un nombre y un apellido');
    } else {
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

  const handleMostrarEsMeProm = () => {
    fetch('http://localhost:5000/api/promedioestudiante', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
    fetch('http://localhost:5000/api/mejorpromedioestudiante', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => {
        setEstMejorProm(data);
        console.log(data);
      });

      if(verMejorProm === false){
        setVerMejorProm(true);
      } else {
        setVerMejorProm(false);
      }
  }

  const handleMostrarEstSinMaterias = () => {
    fetch('http://localhost:5000/api/mestudiante', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => {
        setEstSinMaterias(data);
        console.log(data);
      }).catch(err => console.log(err));

      if(verSinMaterias === false){
        setVerSinMaterias(true);
      }else{
        setVerSinMaterias(false);
      }
  }

  return (
    <div>
      <NavBar />
      <p>Nombre: <input onChange={handleChangeNombre}></input></p>
      <p>Apellido: <input onChange={handleChangeApellido}></input></p>
      <Button onClick={add}>Agregar</Button>

      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
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
                      <span key={mat.id}>{mat.id} </span>
                    )
                  })}</td>
                  <td>
                    <Link to={{ pathname: `/estudiantes/${estudiante.codigo}` }}><Button variant="outline-warning">Editar</Button></Link>
                    <Button variant="outline-danger" onClick={() => handleDelete(estudiante.codigo)}>Eliminar</Button>
                  </td>
                </tr>
              );
            })
            : <h1>Cargando...</h1>}
        </tbody>
      </Table>
      <br/>
      <br/>

      <Button onClick={handleMostrarEsMeProm}>Mostrar 10 mejores promedios</Button>
      {verMejorProm ?
        <Table striped bordered hover>
        <thead>
          <tr>
            <th colSpan="4">Estudiantes con mejor promedio</th>
          </tr>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Promedio</th>
          </tr>
        </thead>
        <tbody>
          {estMejorProm ?
            estMejorProm.map(estudiante => {
              return (
                <tr key={estudiante.codigo}>
                  <td>{estudiante.codigo}</td>
                  <td>{estudiante.nombre}</td>
                  <td>{estudiante.apellido}</td>
                  <td>{estudiante.promedioPonderado}</td>
                </tr>
              );
            })
            : <h1>Cargando...</h1>}
        </tbody>
      </Table>
      : null}
      

      <br/>
      <br/>
      <Button onClick={handleMostrarEstSinMaterias}>Mostrar estudiantes sin materias</Button>
      {verSinMaterias ?
        <Table striped bordered hover>
          <thead>
            <tr>
              <th colSpan="4">Estudiantes sin materias inscritas</th>
            </tr>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Apellido</th>
            </tr>
          </thead>
          <tbody>
            {estSinMaterias ?
              estSinMaterias.map(estudiante => {
                if(estudiante.materias.length === 0){
                return (
                  <tr key={estudiante.codigo}>
                    <td>{estudiante.codigo}</td>
                    <td>{estudiante.nombre}</td>
                    <td>{estudiante.apellido}</td>
                  </tr>
                )}
              })
              : <h1>Cargando...</h1>}
          </tbody>
        </Table>
      : null}
    </div>
  )
}

export default CrearEstudiante