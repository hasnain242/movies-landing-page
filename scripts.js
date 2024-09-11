const apiKey = '5b7e06c6';
const moviesContainer = document.getElementById('movies-container');
const likedMoviesContainer = document.getElementById('liked-movies-container');
const input = document.getElementById('inp');

// Fetch Trending Movies from OMDb API
async function fetchTrendingMovies() {
    try {
        const response = await fetch(`http://www.omdbapi.com/?s=${input.value}&apikey=${apiKey}`);
        const data = await response.json();
        if (data.Response === 'True') {
            displayMovies(data.Search);
        } else {
            console.error('Error fetching movies:', data.Error);
        }
    } catch (error) {
        console.error('Error fetching trending movies:', error);
    }
}

// Display Movies on the Page
function displayMovies(movies) {
    moviesContainer.innerHTML = ''; // Clear previous movies
    movies.forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('movie');

        movieDiv.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <button class="like-btn" onclick="likeMovie('${movie.imdbID}', '${movie.Poster}', '${movie.Title}')">Like</button>
        `;

        moviesContainer.appendChild(movieDiv);
    });
}

// Handle Like Button Click
function likeMovie(imdbID, poster, title) {
    let likedMovies = JSON.parse(localStorage.getItem('likedMovies')) || [];
    if (!likedMovies.find(movie => movie.imdbID === imdbID)) {
        likedMovies.push({ imdbID, poster, title });
        localStorage.setItem('likedMovies', JSON.stringify(likedMovies));
        alert('Movie liked!');
        displayLikedMovies(); // Update liked movies section
    } else {
        alert('Movie already liked!');
    }
}

// Display Liked Movies
function displayLikedMovies() {
    likedMoviesContainer.innerHTML = '';// Clear and set header
    let likedMovies = JSON.parse(localStorage.getItem('likedMovies')) || [];
    likedMovies = likedMovies.filter(movie => movie.imdbID && movie.poster && movie.title); // Filter out invalid entries
    likedMovies.forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('movie');

        movieDiv.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <button class="like-btn" onclick="removeLike('${movie.imdbID}')">Remove Like</button>
        `;

        likedMoviesContainer.appendChild(movieDiv);
    });
}

// Remove Like
function removeLike(imdbID) {
    let likedMovies = JSON.parse(localStorage.getItem('likedMovies')) || [];
    likedMovies = likedMovies.filter(movie => movie.imdbID !== imdbID);
    localStorage.setItem('likedMovies', JSON.stringify(likedMovies));
    displayLikedMovies(); // Update liked movies section
}

// Fetch movies and liked movies when the page loads
input.addEventListener('input', fetchTrendingMovies);
window.onload = displayLikedMovies; // Load liked movies on page load
