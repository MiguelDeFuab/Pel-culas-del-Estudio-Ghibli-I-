// declaración de variables generales
const contenedor = document.getElementById('peliculas');
const urlGhibli = 'https://ghibliapi.vercel.app/films';
let peliculasArray = [];

// declaración de variables de búsqueda
const textoBusqueda = document.getElementById('textoBusqueda');
const botonBuscar = document.getElementById('botonBuscar');

// VARIABLES PARA FAVORITAS 
const contenedorFavoritas = document.getElementById('favoritas');
let favoritas = [];

// Recuperar favoritas guardadas en localStorage al iniciar
const favoritasGuardadas = localStorage.getItem("favoritasGhibli");
if (favoritasGuardadas) {
    favoritas = JSON.parse(favoritasGuardadas);
}


// FUNCIONES DE FAVORITAS 
function mostrarFavoritas() {
    contenedorFavoritas.innerHTML = "";

    if (favoritas.length === 0) {
        contenedorFavoritas.innerHTML = "<p class='text-muted'>Aún no tienes películas favoritas guardadas.</p>";
        return;
    }

    favoritas.forEach(pelicula => {
        contenedorFavoritas.innerHTML += `
            <div class="col-12 col-md-6 col-lg-4">
                <div class="card h-100 shadow-sm border-warning">
                    <img src="${pelicula.imagen}" class="card-img-top img-pelicula" alt="${pelicula.titulo}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title fw-bold">${pelicula.titulo}</h5>
                        <p class="card-text mb-1"><strong>Director:</strong> ${pelicula.director}</p>
                        <p class="card-text mb-3"><strong>Año:</strong> ${pelicula.anio}</p>
                        <div class="mt-auto d-flex justify-content-between align-items-center">
                            <span class="badge bg-success fs-6">Puntuación: ${pelicula.puntuacion} / 100</span>
                            <button class="btn btn-danger btn-sm" onclick="eliminarFavorita('${pelicula.id}')">Quitar</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
}

function guardarFavorita(id, titulo, imagen, director, anio, puntuacion) {
    const yaExiste = favoritas.some(pelicula => pelicula.id === id);

    if (!yaExiste) {
        favoritas.push({
            id: id,
            titulo: titulo.replace(/'/g, "\\'"), // Previene errores con comillas en los títulos, tambien estan en los botones de favoritos
            imagen: imagen,
            director: director,
            anio: anio,
            puntuacion: puntuacion
        });

        localStorage.setItem("favoritasGhibli", JSON.stringify(favoritas));
        mostrarFavoritas();
    }
}

function eliminarFavorita(id) {
    favoritas = favoritas.filter(pelicula => pelicula.id !== id);
    localStorage.setItem("favoritasGhibli", JSON.stringify(favoritas));
    mostrarFavoritas();
}


function cargarPeliculas() {
    fetch(urlGhibli)
        .then(respuesta => respuesta.json())
        .then(datos => {
            peliculasArray = datos; // Linea nueva
            contenedor.innerHTML = "";

            datos.forEach(pelicula => {
                contenedor.innerHTML += `
                    <div class="col-12 col-md-6 col-lg-4">
                        <div class="card h-100 shadow-sm border-0">
                            <img src="${pelicula.image}" class="card-img-top img-pelicula" alt="${pelicula.title}">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title fw-bold">${pelicula.title}</h5>
                                <p class="card-text mb-1"><strong>Director:</strong> ${pelicula.director}</p>
                                <p class="card-text mb-3"><strong>Año:</strong> ${pelicula.release_date}</p>
                                <div class="mt-auto d-flex flex-column gap-2">
                                    <span class="badge bg-success fs-6 align-self-start">Puntuación: ${pelicula.rt_score} / 100</span>
                                    <button class="btn btn-outline-primary" onclick="guardarFavorita('${pelicula.id}', \`${pelicula.title}\`, '${pelicula.image}', '${pelicula.director}', '${pelicula.release_date}', '${pelicula.rt_score}')">Añadir a Favoritas</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });
        });
}

// función de búsqueda
function buscarPelicula(termino) {
    contenedor.innerHTML = "";

    const peliculasFiltradas = peliculasArray.filter(pelicula =>
        pelicula.title.toLowerCase().includes(termino.toLowerCase())
    );

    if (peliculasFiltradas.length === 0) {
        contenedor.innerHTML = "<p class='text-center w-100 mt-4 text-muted'>No hay películas con ese título</p>";
        return;
    }

    peliculasFiltradas.forEach(pelicula => {
        contenedor.innerHTML += `
            <div class="col-12 col-md-6 col-lg-4">
                <div class="card h-100 shadow-sm border-0">
                    <img src="${pelicula.image}" class="card-img-top img-pelicula" alt="${pelicula.title}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title fw-bold">${pelicula.title}</h5>
                        <p class="card-text mb-1"><strong>Director:</strong> ${pelicula.director}</p>
                        <p class="card-text mb-3"><strong>Año:</strong> ${pelicula.release_date}</p>
                        <div class="mt-auto d-flex flex-column gap-2">
                            <span class="badge bg-success fs-6 align-self-start">Puntuación: ${pelicula.rt_score} / 100</span>
                            <button class="btn btn-outline-primary" onclick="guardarFavorita('${pelicula.id}', \`${pelicula.title}\`, '${pelicula.image}', '${pelicula.director}', '${pelicula.release_date}', '${pelicula.rt_score}')">Añadir a Favoritas</button>
                         </div>
                    </div>
                </div>
            </div>
        `;
    });
}

cargarPeliculas();

// Mostrar las favoritas guardadas nada más cargar la web
mostrarFavoritas();

// Listeners
botonBuscar.addEventListener('click', () => {
    const termino = textoBusqueda.value;
    buscarPelicula(termino);
});