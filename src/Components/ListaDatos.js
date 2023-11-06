import React from "react";

export const ListaDatos = () => {
  const [usuarios, setUsuarios] = React.useState([]);
  const [albums, setAlbums] = React.useState([]);
  const [fotos, setFotos] = React.useState([]);

  const traerDatos = async () => {
    const respuestaUsuarios = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );
    const datosUsuarios = await respuestaUsuarios.json();

    const respuestaAlbums = await fetch(
      "https://jsonplaceholder.typicode.com/albums"
    );
    const datosAlbums = await respuestaAlbums.json();

    const respuestaFotos = await fetch(
      "https://jsonplaceholder.typicode.com/photos"
    );
    const datosFotos = await respuestaFotos.json();

    setUsuarios(datosUsuarios);
    setAlbums(datosAlbums);
    setFotos(datosFotos);
  };

  React.useEffect(() => {
    traerDatos();
  }, []);

  return (
    <div>
      {usuarios.map((usuario) => (
        <div key={usuario.id}>
          <h2>User: {usuario.name}</h2>
          {albums
            .filter((album) => album.userId === usuario.id)
            .map((album) => (
              <div key={album.id}>
                <h3>Album: {album.title}</h3>
                <ul>
                  {fotos
                    .filter((foto) => foto.albumId === album.id)
                    .map((foto) => (
                      <li key={foto.id}>{foto.title}</li>
                    ))}
                </ul>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};
