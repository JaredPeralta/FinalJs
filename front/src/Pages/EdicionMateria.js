import React from "react";
import { useState , useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from "react-bootstrap";
import NavBar from "../Components/NavBar/NavBar";

const EdicionMateria = () => {
  let navigate = useNavigate();
  let params = useParams();
  const [name, setName] = useState('');
  const [creditos, setCreditos] = useState('');
  const [materia, setMateria] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/materia?id=${params.id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setMateria(data[0]);
      }
      );
  }, []);

  const handleChangeNombre = (e) => {
    if (e.target.value === '') {
      setName(' ');
    }else {
      setName(e.target.value);
    }
  }

  const handleChangeCreditos = (e) => {
    if (e.target.value === '') {
      setCreditos(' ');
    }else {
      setCreditos(e.target.value);
    }
  }

  const handleEdit = () => {
    switch (true) {
      case name === '' && creditos === '':
        fetch('http://localhost:5000/api/materia/', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id : parseInt(params.id),
            nombre: materia.nombre,
            creditos: materia.creditos
          })
        })
        navigate("/materias", { replace: true });
        break;
      case name === ' ' && creditos === ' ':
        alert('Debe ingresar un nombre a la asignatura y una cantidad de creditos');
        break;
      case name === '' && creditos !== ' ':
        fetch('http://localhost:5000/api/materia/', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id : parseInt(params.id),
            nombre: materia.nombre,
            creditos: creditos
          })
        })
        navigate("/materias", { replace: true });
        break;
      case name !== ' ' && creditos === '':
        fetch('http://localhost:5000/api/materia/', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id : parseInt(params.id),
            nombre: name,
            creditos: materia.creditos
          })
        })
        navigate("/materias", { replace: true });
        break;
      case name !== ' ' && creditos !== ' ':
        fetch('http://localhost:5000/api/materia/', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id : parseInt(params.id),
            nombre: name,
            creditos: creditos
          })
        })
        navigate("/materias", { replace: true });
        break;
        case name === ' ' && creditos !== ' ':
          alert('Debe ingresar un nombre a la asignatura y una cantidad de creditos');
          break;
        case name !== ' ' && creditos === ' ':
          alert('Debe ingresar un nombre a la asignatura y una cantidad de creditos');
          break;
      default:
        alert('Debe ingresar un nombre a la asignatura y una cantidad de creditos');
    }
  }

  return (
    <div>
      <NavBar />
      {materia ? 
        <>
          <p>Nombre: <input value={name ? name : materia.nombre} onChange={handleChangeNombre}></input></p>
          <p>Creditos: <input value={creditos ? creditos : materia.creditos} onChange={handleChangeCreditos}></input></p>
          <Button onClick={handleEdit}>Actualizar Materia</Button>
        </>
      : <div>Cargando...</div>}
    </div>
  );
}
export default EdicionMateria;