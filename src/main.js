//UTILS

function createMovies(movies, container) {
  container.innerHTML = "";

  movies.forEach((movie) => {
    const movieContainer = document.createElement("div");
    movieContainer.classList.add("movie-container");
    movieContainer.addEventListener("click", () => {
      location.hash = "#movie=" + movie.id;
    });

    const movieImg = document.createElement("img");
    movieImg.classList.add("movie-img");
    movieImg.setAttribute("alt", movie.title);
    movieImg.setAttribute(
      "src",
      "http://image.tmdb.org/t/p/w300/" + movie.poster_path
    );

    movieContainer.appendChild(movieImg);
    container.appendChild(movieContainer);
  });
}

function createCategories(categories, container) {
  container.innerHTML = "";

  categories.forEach((category) => {
    const categoryContainer = document.createElement("div");
    categoryContainer.classList.add("category-container");

    const categoryTitle = document.createElement("h3");
    categoryTitle.classList.add("category-title");
    categoryTitle.setAttribute("id", "id" + category.id);
    categoryTitle.addEventListener("click", () => {
      location.hash = `#category=${category.id}-${category.name}`;
    });
    const categoryTitleText = document.createTextNode(category.name);

    categoryTitle.appendChild(categoryTitleText);
    categoryContainer.appendChild(categoryTitle);
    container.appendChild(categoryContainer);
  });
}

//API CALLS

async function getTrendingMoviesPreview() {
  const res = await fetch(
    "http://api.themoviedb.org/3/trending/movie/day?api_key=" + API_KEY
  );
  const data = await res.json();
  const movies = data.results;

  createMovies(movies, trendingMoviesPreviewList);
}

async function getCategoriesPreview() {
  const res = await fetch(
    "http://api.themoviedb.org/3/genre/movie/list?api_key=" + API_KEY
  );
  const data = await res.json();
  const categories = data.genres;

  createCategories(categories, categoriesPreviewList);
}

async function getMoviesByCategory(id) {
  const res = await fetch(
    "http://api.themoviedb.org/3/discover/movie" +
      "?api_key=" +
      API_KEY +
      "&with_genres=" +
      id
  );
  const data = await res.json();
  const movies = data.results;

  createMovies(movies, genericSection);
}

async function getMoviesBySearch(query) {
  const res = await fetch(
    "http://api.themoviedb.org/3/search/movie?api_key=" +
      API_KEY +
      "&query=" +
      query
  );
  const data = await res.json();
  const movies = data.results;

  createMovies(movies, genericSection);
}

async function getTrendingMovies() {
  const res = await fetch(
    "http://api.themoviedb.org/3/trending/movie/day?api_key=" + API_KEY
  );
  const data = await res.json();
  const movies = data.results;

  createMovies(movies, genericSection);
}

async function getMovieById(id) {
  const res = await fetch(
    "http://api.themoviedb.org/3/movie/" + id + "?api_key=" + API_KEY
  );
  const data = await res.json();

  const movieImgUrl = "https://image.tmdb.org/t/p/w500" + data.poster_path;
  headerSection.style.background = `linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.35) 19.27%,
    rgba(0, 0, 0 ,0) 29.17%
    ),
    url(${movieImgUrl})`;

  movieDetailTitle.textContent = data.title;
  movieDetailDescription.textContent = data.overview;
  movieDetailScore.textContent = data.vote_average;

  createCategories(data.genres, movieDetailCategoriesList);

  getRelatedMoviesId(id);
}

async function getRelatedMoviesId(id) {
  const res = await fetch(
    "http://api.themoviedb.org/3/movie/" + id + "/similar?api_key=" + API_KEY
  );
  const data = await res.json();
  const relatedMovies = data.results;

  createMovies(relatedMovies, relatedMoviesContainer);
}