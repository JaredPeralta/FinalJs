import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Button , Table } from 'react-bootstrap';
import NavBar from '../Components/NavBar/NavBar';

const VerMateria = () => {
  let params = useParams();
  const [respuesta, setRespuesta] = useState([]);
  const [materia, setMateria] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]);
  const [id, setId] = useState('');
  const [nota1, setNota1] = useState('');
  const [nota2, setNota2] = useState('');
  const [nota3, setNota3] = useState('');
  const [notaLab, setNotaLab] = useState('');
  const [estMenor3, setEstMenor3] = useState([]);
  const [mostrarEst3, setMostrarEst3] = useState(false);
  const [estMejorNota, setEstMejorNota] = useState([]);
  const [mostrarEstMejorNota, setMostrarEstMejorNota] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/api/materia?id=${params.id}`)
      .then(res => res.json())
      .then(data => {
        setRespuesta(data);
        setMateria(data[0]);
        setEstudiantes(data[1]);
        setEstMenor3(data[2]);
        setEstMejorNota(data[3]);
        //console.log(data);
        //console.log(data[0]);
        //console.log(data[1]);
        //console.log(data[3]);
      });
  }, []);

  const handleChangeId = (e) => {
    setId(e.target.value);
  }
  const handleChangeNota1 = (e) => {
    setNota1(e.target.value);
  }
  const handleChangeNota2 = (e) => {
    setNota2(e.target.value);
  }
  const handleChangeNota3 = (e) => {
    setNota3(e.target.value);
  }
  const handleChangeNotaLab = (e) => {
    setNotaLab(e.target.value);
  }

  const addEstudiante = () => {
    if (notaLab === '') {
      if (id === '' || nota1 === '' || nota2 === '' || nota3 === '') {
        alert('Debe ingresar todos los datos');
      }else{
        fetch('http://localhost:5000/api/aemateria', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            codigoMateria: parseInt(params.id),
            codigo: parseInt(id),
            nota1: parseFloat(nota1),
            nota2: parseFloat(nota2),
            nota3: parseFloat(nota3),
            info: "t"
          })
        })

        fetch('http://localhost:5000/api/promedioestudiante', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        window.location.reload();
      }
    } else {
      if (id === '' || nota1 === '' || nota2 === '' || nota3 === '' || notaLab === '') {
        alert('Debe ingresar todos los datos');
      }else{
        fetch('http://localhost:5000/api/aemateria', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            codigoMateria: parseInt(params.id),
            codigo: parseInt(id),
            nota1: parseFloat(nota1),
            nota2: parseFloat(nota2),
            nota3: parseFloat(nota3),
            notaLab: parseFloat(notaLab),
            info: "tp"
          })
        })
        fetch('http://localhost:5000/api/promedioestudiante', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        window.location.reload();
      }
    }
  }

  const handleDelete = (id) => {
    console.log(id);
    fetch('http://localhost:5000/api/eemateria', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        codigo: parseInt(id),
        codigoMateria: parseInt(params.id),
      })
    });
    fetch('http://localhost:5000/api/promedioestudiante', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    window.location.reload()
  }

  const handleMostrarEstMenor3 = () => {
    if (mostrarEst3 === false) {
      setMostrarEst3(true);
    } else {
      setMostrarEst3(false);
    }
  }

  const handleMostrarEstMejorNota = () => {
    if (mostrarEstMejorNota === false) {
      setMostrarEstMejorNota(true);
    }else {
      setMostrarEstMejorNota(false);
    }
  }

  return (
    <div>
      <NavBar />
      <p>Id estudiante: <input onChange={handleChangeId}></input></p>
      {materia.tipo === "t" ?
        <>
          <p>Nota 1: <input onChange={handleChangeNota1}></input></p>
          <p>Nota 2: <input onChange={handleChangeNota2}></input></p>
          <p>Nota 3: <input onChange={handleChangeNota3}></input></p>
        </>
        : <>
          <p>Nota 1: <input onChange={handleChangeNota1}></input></p>
          <p>Nota 2: <input onChange={handleChangeNota2}></input></p>
          <p>Nota 3: <input onChange={handleChangeNota3}></input></p>
          <p>Nota Lab: <input onChange={handleChangeNotaLab}></input></p>
        </>}
      <Button onClick={addEstudiante}>Agregar Estudiante a Materia</Button>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th colSpan="6">Nombre Materia: {materia.nombre} </th>
          </tr>
          <tr>
            <th colSpan="3">Tipo Materia: {materia.tipo === "t" ? "Teorico" : "Teorico-Practico"} </th>
            <th colSpan="3">Creditos: {materia.creditos}</th>
          </tr>
          <tr>
            <th>CodEst</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Notas</th>
            <th>Nota Final</th>
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
                  <td>{materia.estudiantesInscritos.map(mat => {
                    if (mat.codigo === estudiante.codigo) {
                      if (materia.tipo === "t") {
                        return (<div><p>{mat.nota1}</p>
                          <p>{mat.nota2}</p>
                          <p>{mat.nota3}</p>
                        </div>)
                      } else {
                        return (<div><p>{mat.nota1}</p>
                          <p>{mat.nota2}</p>
                          <p>{mat.nota3}</p>
                          <p>{mat.notaLab}</p>
                        </div>)
                      }
                    }
                  })}</td>
                  <td>
                    {materia.estudiantesInscritos.map(mat => {
                      if (mat.codigo === estudiante.codigo) {
                        return (<p>{mat.notaF}</p>)
                      }
                    })}
                  </td>
                  <td>
                    <Link to={{ pathname: `/materias/modificar/${materia.id}/${estudiante.codigo}` }}><Button variant="outline-warning">Modificar Notas</Button></Link>
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
      <Button onClick={handleMostrarEstMenor3}>Mostrar Estudiantes con nota menor a 3.0</Button>
      {mostrarEst3 ?
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th colSpan="4">Estudiantes con nota menor a 3.0</th>
            </tr>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Nota Final</th>
            </tr>
          </thead>
          <tbody>
            {estMenor3 ?
              estMenor3.map(estudiante => {
                return(
                  <tr key={estudiante.codigo}>
                    <td>{estudiante.codigo}</td>
                    <td>{estudiante.nombre}</td>
                    <td>{estudiante.apellido}</td>
                    <td>{estudiante.notaFinal}</td>
                  </tr>
                )
              })
              : <h1>Cargando...</h1>}
              
          </tbody>
        </Table> 
        : null}
      <br/>
      <br/>
      <Button onClick={handleMostrarEstMejorNota}>Estudiantes ordenados por mejor nota</Button>
      {mostrarEstMejorNota ?
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th colSpan="4">Estudiantes ordenados por mejor nota</th>
            </tr>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Nota Final</th>
            </tr>
          </thead>
          <tbody>
            {estMejorNota ?
              estMejorNota.map(estudiante => {
                return (
                  <tr key={estudiante.codigo}>
                    <td>{estudiante.codigo}</td>
                    <td>{estudiante.nombre}</td>
                    <td>{estudiante.apellido}</td>
                    <td>{estudiante.notaFinal}</td>
                  </tr>
                )
              })
            : <h1>Cargando...</h1>}
          </tbody>
        </Table>
      : null}
    </div>
  );
}
export default VerMateria;