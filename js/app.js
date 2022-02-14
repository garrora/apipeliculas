// Variables
const card = document.getElementById('card');
const btnMasPeliculas = document.querySelector('.btn-outline-danger');

// La paginación iniciará desde la 1 y así sucesivamente (MAX: 1000)
let pagina = 1;

// Template que hace referencia al del contenido HTML
const templateCard = document.getElementById('templateCard').content;

// Fragment para evitar el reflow
const fragment = document.createDocumentFragment();


/* ---------------------- 

Funciones utilizadas

 ---------------------- */
 
const cargarDatosAPI = (estado) => {

    const loading = document.querySelector('.spinner-border');

    /* Sí, los datos extraídos de la API tardan en cargar  muestra un pequeño loading */
    estado ? loading.classList.remove('d-none') : loading.classList.add('d-none');


}

/* Consume una API relacionada con el enlace que esta entre comillas simples, con ello
 se obtiene una respuesta y esa respuesta si es valida sera visualizada en pantalla mediante las cards correspodientes */
const consumirAPIPeliculas = async () => {

    try {

        cargarDatosAPI(true);

        const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=2b8a23777538e7640ebb1b586715a9df&language=es-MX&page=${pagina}`);

        // Condicional de respuesta de acuerdo al estatus recibido

        if (res.status === 200) {
            const data = await res.json();
            listarPeliculas(data.results);
        }

        if (res.status === 401) {
            console.log('El enlace para consumir el API es incorrecto');
        }

        if (res.status === 404) {
            console.log('La película no existe');
        }

    } catch (error) {

        console.log(error)

    } finally {

        cargarDatosAPI(false);

    }

}

/* Recorre los elementos extraídos del consumo de la API, en este caso, nos interesa dos elementos : imagen y el título de la película */
const listarPeliculas = (data) => {


    data.forEach((item) => {

        templateCard.querySelector('h6').textContent = item.title;
        templateCard.querySelector('img').setAttribute('src', `https://image.tmdb.org/t/p/w500${item.poster_path}`);

        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);

    })

    card.appendChild(fragment);

}

/* ---------------------- 

Invocación o llamada de funciones

 ---------------------- */

consumirAPIPeliculas();

/* ---------------------- 

Accion de botón cargar más películas 

 ---------------------- */

 btnMasPeliculas.addEventListener('click', (e) =>{
    
    /* La API tiene un numero máximo de páginación (1000), en este caso preguntamos si la página es menor a 1000 se puede seguir cargando más películas.*/

    // Condicional ternario
    pagina < 1000 ? (pagina += 1, consumirAPIPeliculas()) : ''
    
 })
