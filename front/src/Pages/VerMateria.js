import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom'

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

  //console.log(params.id);
  useEffect(() => {
    fetch(`http://localhost:5000/api/materia?id=${params.id}`)
      .then(res => res.json())
      .then(data => {
        setRespuesta(data);
        setMateria(data[0]);
        setEstudiantes(data[1]);
        //console.log(data);
        console.log(data[0]);
        console.log(data[1]);
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
    if(notaLab === ''){
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
    })}else{
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
    window.location.reload()
  }

  

  return (
    <div>
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
      <button onClick={addEstudiante}>Agregar Estudiante a Materia</button>
      <table border="1">
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
                  <Link to={{ pathname: `/materias/modificar/${materia.id}/${estudiante.codigo}` }}><button>Modificar Notas</button></Link>
                  <button onClick={() => handleDelete(estudiante.codigo)}>Eliminar</button>
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
export default VerMateria;