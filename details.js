const apiKey = '4638fd7e1f9a447f699d14ff279cf2b4';
const baseImageUrl = 'https://image.tmdb.org/t/p/w500';

// Extract movie id from the URL
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

// DOM elements to update with movie details
const movieTitle = document.getElementById('movie-title');
const moviePoster = document.getElementById('movie-poster');
const movieOverview = document.getElementById('movie-overview');

async function fetchMovieDetails() {
    try {
        // Fetch movie details using the movieId
        const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            // Update the page with the movie's title, poster, and overview
            movieTitle.textContent = data.title;
            moviePoster.src = data.poster_path
                ? `${baseImageUrl}${data.poster_path}`
                : 'https://via.placeholder.com/500x750?text=No+Image';
            movieOverview.textContent = data.overview;
        } else {
            console.error('Failed to fetch movie details:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching movie details:', error);
    }
}

fetchMovieDetails();
            