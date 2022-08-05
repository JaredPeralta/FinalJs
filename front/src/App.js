import { useState, useEffect } from 'react';
import './App.css';

const App = () => {

  const [datos, setDatos] = useState(null);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/musuario') 
    .then(res => res.json()) 
    .then(data => {
      setDatos(data);
      console.log(data.estudiantes);
    }); 
  }, []);

  const handleChangeNombre = (e) => {
    setName(e.target.value);
  }

  const handleChangeContrasenna = (e) => {
    setPassword(e.target.value);
  }

  const add = () => {
    fetch('http://localhost:5000/api/usuario', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombre: name,
        contrasenna: password
      })
    })
  }

  return (
    <div className="App">
      <p>Nombre: <input onChange={handleChangeNombre}></input></p>
      <p>Contrasenna: <input onChange={handleChangeContrasenna}></input></p>
      <button onClick={add}>Add</button>

      {datos ? 
        datos.estudiantes.map(item => (
          <div key={item.codigo}>
            <h2>{`Estudiante: ${item.nombre}`}</h2>
            <p>{`Id: ${item.codigo}`}</p>
          </div>
        ))
      : <h1>Cargando...</h1>}
    </div>
  );
}

export default App;
