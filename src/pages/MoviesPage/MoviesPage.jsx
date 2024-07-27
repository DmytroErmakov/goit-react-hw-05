import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";

const API_KEY = "668eb06e858bc95bbf59ba222dcc3087";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (query) {
      const fetchMovies = async () => {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}`
          );
          setMovies(response.data.results);
        } catch (error) {
          console.error(error);
        }
      };
      fetchMovies();
    }
  }, [query]);

  const handleSearch = event => {
    event.preventDefault();
    const form = event.currentTarget;
    const newQuery = form.elements.search.value;
    setSearchParams({ query: newQuery });
  };

  return (
    <div>
      <h1>Search Movies</h1>
      <form onSubmit={handleSearch}>
        <input type="text" name="search" defaultValue={query} />
        <button type="submit">Search</button>
      </form>

      <MovieList movies={movies} />
    </div>
  );
}
