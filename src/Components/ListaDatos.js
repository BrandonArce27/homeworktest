import React from 'react'

export const ListaDatos = () => {

const [usuarios , setUsuarios] = React.useState([]);
const [albums , setAlbums] = React.useState([]);
const [fotos , setFotos] = React.useState([]);

const traerDatos = async () => {

    const respuestaUsuarios = await fetch("https://jsonplaceholder.typicode.com/users");
    const datosUsuarios =  await respuestaUsuarios.json();

    const respuestaAlbums = await fetch("https://jsonplaceholder.typicode.com/albums");
    const datosAlbums =  await respuestaAlbums.json();

    const respuestaFotos = await fetch("https://jsonplaceholder.typicode.com/photos");
    const datosFotos =  await respuestaFotos.json();

    setUsuarios(datosUsuarios);
    setAlbums(datosAlbums);
    setFotos(datosFotos);

}

React.useEffect(()=>{
    traerDatos();
},[]);

  return (
    <ul>{usuarios.map((usuario)=>(
        <li key={usuario.id}>
            <p>{usuario.name}</p>
        </li>
    ))}</ul>
    )
}
