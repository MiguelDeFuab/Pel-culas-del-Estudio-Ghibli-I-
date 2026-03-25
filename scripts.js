// declaración de variables generales
const contenedor = document.getElementById('peliculas');
const urlGhibli = 'https://ghibliapi.vercel.app/films';
let peliculasArray = [];

// declaración de variables de búsqueda
const textoBusqueda = document.getElementById('textoBusqueda');
const botonBuscar = document.getElementById('botonBuscar');

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
                                <div class="mt-auto">
                                    <span class="badge bg-success fs-6">Puntuación: ${pelicula.rt_score} / 100</span>
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
                        <div class="mt-auto">
                            <span class="badge bg-success fs-6">Puntuación: ${pelicula.rt_score} / 100</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
}

cargarPeliculas();

botonBuscar.addEventListener('click', () => {
    const termino = textoBusqueda.value; 
    buscarPelicula(termino);
});