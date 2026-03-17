const contenedor = document.getElementById('peliculas');
const urlGhibli = 'https://ghibliapi.vercel.app/films';

function cargarPeliculas() {
    fetch(urlGhibli)
        .then(respuesta => respuesta.json())
        .then(datos => {
            contenedor.innerHTML = "";
            
            datos.forEach(pelicula => {
                contenedor.innerHTML += `
                    <div class="col-12 col-md-6 col-lg-4">
                        <div class="card h-100 shadow-sm border-0">
                            <img src="${pelicula.image}" class="card-img-top img-pelicula" alt="${pelicula.title}">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title fw-bold">${pelicula.title}</h5>
                                <p class="card-text mb-1"><strong>Director:</strong> ${pelicula.director}</p>
                                <p class="card-text mb-3"><strong>Año:</strong> ${pelicula.release_year}</p>
                                <div class="mt-auto">
                                    <span class="badge bg-success fs-6">Puntuación: ${pelicula.rt_score} / 100</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });
        })
}

cargarPeliculas();