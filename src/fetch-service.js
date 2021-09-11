import axios from "axios";
const API_KEY = "bf52702752a5ae3d0e879b91a59cc623";

export const fetchTrendingMovies = async function () {
  const data = await axios.get(
    `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`
  );
  return data;
};

export const fetchMovieById = async function (movieID) {
  const data = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieID}?api_key=${API_KEY}&language=en-US`
  );
  return data;
};

export const fetchMoviesByName = async function (query) {
  const q = query.toLowerCase().trim();
  const data = await axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${q}&language=en-US&page=1&include_adult=false`
  );
  return data;
};

export const fetchCastInfo = async function (movieID) {
  const data = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=${API_KEY}&language=en-US`
  );
  return data;
};

export const fetchReviews = async function (movieID) {
  const data = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieID}/reviews?api_key=${API_KEY}&language=en-US&page=1`
  );
  return data;
 }
