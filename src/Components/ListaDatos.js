import React from "react";


export const ListaDatos = () => {
  const [usuarios, setUsuarios] = React.useState([]);
  const [albums, setAlbums] = React.useState([]);
  const [fotos, setFotos] = React.useState([]);

  const [cargando, setCargando] = React.useState(true);

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
    //
    setUsuarios(datosUsuarios);
    setAlbums(datosAlbums);
    setFotos(datosFotos);
    setCargando(false);
  };

  React.useEffect(() => {
    traerDatos();
  }, []);

  if (cargando) {
    return <p>Cargando...</p>;
  }

  return (
    //De esta manera renderizamos los datos y los relacionamos a la vez.
    <div> 
      {usuarios.map((usuario) => (
        <div key={usuario.id}>
          <h2>Usuario: {usuario.name}</h2>
          {albums
            .filter((album) => album.userId === usuario.id)
            .map((album) => (
              <div key={album.id}>
                <h3>Album: {album.title}</h3>
                <ul className="fotos" style={{display:"flex"}}>
                  {fotos
                    .filter((foto) => foto.albumId === album.id)
                    .map((foto) => (
                      <div key={foto.id}>
                        <img src={foto.thumbnailUrl} alt={foto.title} />
                      </div>
                    ))}
                </ul>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};
