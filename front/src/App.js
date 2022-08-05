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
        datos.map(item => (
          <div key={item.id}>
            <h2>{`Estudiante: ${item.nombre}`}</h2>
            <p>{`Id: ${item.id}`}</p>
          </div>
        ))
      : <h1>Cargando...</h1>}
    </div>
  );
}

export default App;
