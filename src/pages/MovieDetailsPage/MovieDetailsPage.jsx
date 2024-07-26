import React from "react";
import { useState, useEffect, Suspense, useRef } from "react";
import { useParams, Link, useNavigate, Outlet, useLocation } from "react-router-dom";
import axios from "axios";

const API_KEY = "668eb06e858bc95bbf59ba222dcc3087";

export default function MoviesDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const fromLocationRef = useRef(location.state?.from || "/movies");

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`)
      .then(response => setMovie(response.data))
      .catch(error => console.error(error));
  }, [movieId]);

  if (!movie) return <div>Loading search Films...</div>;

  return (
    <div>
      <button
        onClick={() =>
          navigate(fromLocationRef.current)
        }
      >
        Go back
      </button>
      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <p>{movie.overview}</p>
      <ul>
        <li>
          <Link to="cast" state={{ from: fromLocationRef.current }}>
            Cast
          </Link>
        </li>
        <li>
          <Link to="reviews" state={{ from: fromLocationRef.current }}>
            Reviews
          </Link>
        </li>
      </ul>
      <Suspense fallback={<div>Loading search Films...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
}
