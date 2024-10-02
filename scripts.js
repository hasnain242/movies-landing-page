const apiKey = '4638fd7e1f9a447f699d14ff279cf2b4'; 
const baseImageUrl = 'https://image.tmdb.org/t/p/w500';
const moviesContainer = document.getElementById('movies-container');
const likedMoviesContainer = document.getElementById('liked-movies-container');
const input = document.getElementById('inp');
async function fetchTrendingMovies() {
    try {
        const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();        
        if (response.ok) {
            displayMovies(data.results);
        } else {
            console.error('Error fetching trending movies:', data);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function fetchTrending() {
    try {
        const query = input.value;
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        
        if (response.ok) {
            displayMovies(data.results);
        } else {
            console.error('Error fetching movies:', data);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Display Movies on the Page
function displayMovies(movies) {
    moviesContainer.innerHTML = ''; 
    movies.forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('bg-black', 'rounded-lg', 'shadow-md' ,'p-4' ,'text-center' ,'text-white');

        const posterUrl = movie.poster_path ? `${baseImageUrl}${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image';
        
        movieDiv.innerHTML = `
        <a target="_blank" href="details.html?id=${movie.id}" class="no-underline text-white">
            <img src="${posterUrl}" alt="${movie.title}" class="w-full rounded-lg h-[160px] lg:h-[300px]">
            <h3 class="h-[50px] text-[16px]">${movie.title}</h3>
            </a>
            <button class="text-white border-none px-5 py-2.5 cursor-pointer rounded w-4/5 bg-darkred hover:bg-lightred" id = "44" onclick="likeMovie('${movie.id}', '${movie.poster_path}', '${movie.title}')">Like</button>
            `;
            
        moviesContainer.appendChild(movieDiv);
    });
    
    
}

function likeMovie(id, poster_path, title) {
    let likedMovies = JSON.parse(localStorage.getItem('likedMovies')) || [];
    if (!likedMovies.find(movie => movie.id === id)) {
        likedMovies.push({ id, poster_path, title });
        localStorage.setItem('likedMovies', JSON.stringify(likedMovies));
        alert('movie liked!')
        displayLikedMovies();
    } 
}

function displayLikedMovies() {
    likedMoviesContainer.innerHTML = ''; 
    let likedMovies = JSON.parse(localStorage.getItem('likedMovies')) || [];
    likedMovies = likedMovies.filter(movie => movie.id && movie.poster_path && movie.title); // Filter out invalid entries
    likedMovies.forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('bg-black', 'rounded-lg', 'shadow-md' ,'p-4' ,'text-center' ,'text-white');

        const posterUrl = movie.poster_path ? `${baseImageUrl}${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image';

        movieDiv.innerHTML = `
            <img src="${posterUrl}" alt="${movie.title}" class="w-full rounded-lg h-[300px] ">
            <h3 class="h-[55px] text-white text-xl">${movie.title}</h3>
            <button  onclick="removeLike('${movie.id}')" class="text-white border-none px-5 py-2.5 cursor-pointer rounded w-4/5 bg-darkred hover:bg-lightred">Remove Like</button>
        `;

        likedMoviesContainer.appendChild(movieDiv);
    });
}

function removeLike(id) {
    let likedMovies = JSON.parse(localStorage.getItem('likedMovies')) || [];
    likedMovies = likedMovies.filter(movie => movie.id !== id);
    localStorage.setItem('likedMovies', JSON.stringify(likedMovies));
    displayLikedMovies(); 
}

fetchTrendingMovies();
input.addEventListener('input', ()=>{
    if(input.value){
        fetchTrending()
    }else{
        fetchTrendingMovies()
    }
});
window.onload = displayLikedMovies; 
