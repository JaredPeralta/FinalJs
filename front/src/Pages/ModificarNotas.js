import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom'
import NavBar from "../Components/NavBar/NavBar";
import { Button } from "react-bootstrap";

const ModificarNotas = () => {
  const idMateria = parseInt(useParams().idMateria);
  const idEstudiante = parseInt(useParams().idEstudiante);
  const [materia, setMateria] = useState('');
  const [nota1, setNota1] = useState('');
  const [nota2, setNota2] = useState('');
  const [nota3, setNota3] = useState('');
  const [notaLab, setNotaLab] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/api/materia?id=${idMateria}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setMateria(data[0]);
      }
      );
  }, []);

  const handleChangeNota1 = (e) => {
    if (e.target.value === '') {
      setNota1(' ');
    } else {
      setNota1(e.target.value);
    }
  }
  const handleChangeNota2 = (e) => {
    if (e.target.value === '') {
      setNota2(' ');
    } else {
      setNota2(e.target.value);
    }
  }
  const handleChangeNota3 = (e) => {
    if (e.target.value === '') {
      setNota3(' ');
    } else {
      setNota3(e.target.value);
    }
  }
  const handleChangeNotaLab = (e) => {
    if (e.target.value === '') {
      setNotaLab(' ');
    } else {
      setNotaLab(e.target.value);
    }
  }

  const handleChangeNotas = () => {
    if(notaLab === ''){
      fetch('http://localhost:5000/api/mnemateria', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          codigoMateria: idMateria,
          codigo: idEstudiante,
          nota1: parseFloat(nota1),
          nota2: parseFloat(nota2),
          nota3: parseFloat(nota3),
          info: "t"
        })
      })}else{
        fetch('http://localhost:5000/api/mnemateria', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            codigoMateria: idMateria,
            codigo: idEstudiante,
            nota1: parseFloat(nota1),
            nota2: parseFloat(nota2),
            nota3: parseFloat(nota3),
            notaLab: parseFloat(notaLab),
            info: "tp"
          })
        })
      }
      fetch('http://localhost:5000/api/promedioestudiante', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      navigate(`/materias/ver/${idMateria}`)
  }

  return (
    <div>
      <NavBar />
      {materia ?
        materia.estudiantesInscritos.map(estudiante => {
          if (estudiante.codigo === idEstudiante) {
            return (
              <div>
                <p>Id estudiante: {idEstudiante}</p>
                {materia.tipo === "t" ?
                  <>
                    <p>Nota 1: <input value={nota1 ? nota1 : estudiante.nota1} onChange={handleChangeNota1}></input></p>
                    <p>Nota 2: <input value={nota2 ? nota2 : estudiante.nota2} onChange={handleChangeNota2}></input></p>
                    <p>Nota 3: <input value={nota3 ? nota3 : estudiante.nota3} onChange={handleChangeNota3}></input></p>
                  </>
                  : <>
                    <p>Nota 1: <input value={nota1 ? nota1 : estudiante.nota1} onChange={handleChangeNota1}></input></p>
                    <p>Nota 2: <input value={nota2 ? nota2 : estudiante.nota2} onChange={handleChangeNota2}></input></p>
                    <p>Nota 3: <input value={nota3 ? nota3 : estudiante.nota3} onChange={handleChangeNota3}></input></p>
                    <p>Nota Lab: <input value={notaLab ? notaLab : estudiante.notaLab} onChange={handleChangeNotaLab}></input></p>
                  </>}
                <Button onClick={handleChangeNotas}>Modificar Notas</Button>
              </div>
            )
          }
        })
        : <h1>Cargando...</h1>}
    </div>
  );
}
export default ModificarNotas;