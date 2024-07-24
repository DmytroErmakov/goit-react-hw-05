import React from "react";
import { useState, useEffect, lazy, Suspense } from "react";
import { useParams, Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import axios from "axios";

// const MovieCast = lazy(() => import("../../components/MovieCast/MovieCast"));
// const MovieReviews = lazy(() =>
//   import("../../components/MovieReviews/MovieReviews")
// );

const API_KEY = "668eb06e858bc95bbf59ba222dcc3087";

export default function MoviesDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`)
      .then(response => setMovie(response.data))
      .catch(error => console.error(error));
  }, [movieId]);

  if (!movie) return <div>Loading search Films...</div>;

  return (
    <div>
           
      <button onClick={() => navigate(-1)}>Go back</button>
      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <p>{movie.overwiew}</p>
            <ul>
        <li>
          <Link to="cast">Cast</Link>
        </li>
        <li>
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>
      <Suspense fallback={<div>Loading search Films...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
}
