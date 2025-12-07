const testUserSearch = 'tailor swift';
const testEncodeUserSearch = encodeURIComponent(testUserSearch);
console log(`testQuerry: ${testQuerry}`);
const testParams = `?q=${testEncodeUserSearch}&type=track&limit=10`;
const testSpotifyBaseUrl = import.meta.env.VITE_API_URL;
const testFullUrl = `${testSpotifyBaseUrl}${testParams}`;
console.log(`testFullUrl : ${testFullUrl}`);
const accessToken = BQAK05wEzllpJi2I5ExWUr-wSXz9w_rgLiMktKP      vB-TT7xTQ1XxJYchT5loMIBUR7qi-G2DVKepWgiQy9Knj84xqIDPgnns      laf2Na49AMIPJgIQyF6nZqbjEQ0a_FCbRVyzASMeEh2c;

const getData = async () => {
    try {
        const response = await fetch(testFullUrl, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        if (response.ok) {
            const jsonResponse = await response.json();
            console.log(jsonResponse); 
        }
        throw new Error('Request failed');
    }
    catch (error) {
      console.log(error);
    }
}
l

const getGenres = async () => {
  const genreRequestEndpoint = '/genre/movie/list';
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;
  console.log(urlToFetch);
  
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      const genres = jsonResponse.genres;
      console.log(genres);
      return genres;
    }
  } catch (error) {
    console.log(error)
  }
};

const getMovies = async () => {
  const selectedGenre = getSelectedGenre();
  const discoverMovieEndpoint = '/discover/movie';
  const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`;
  const urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`;
  console.log(urlToFetch);

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      const movies = jsonResponse.results;
      return movies;
    }
  } catch (error) {
    console.log(error);
  }
};

const getMovieInfo = async (movie) => {
  const movieId = movie.id;
  const movieEndpoint = `/movie/${movieId}`;
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const movieInfo = await response.json();
      return movieInfo;
    }
  } catch (error) {
    console.log(error);
  }
};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async () => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  }
  const movie = await getMovies();
  const randomMovie = getRandomMovie(movie);
  const info = await getMovieInfo(randomMovie);
  displayMovie(info);
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;
