import React from "react";
import { Link }  from "react-router-dom";
import css from "./MovieList.module.css";

export default function MovieList({ movies }) {
  return (
    <ul className={css.movieList}>
      {movies.map(movie => (
        <li key={movie.id} className={css.movieIte}>
          <Link to={`/movies/${movie.id}`}>
            {/* <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="css.moviePoster"
            /> */}
            <p>{movie.title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
