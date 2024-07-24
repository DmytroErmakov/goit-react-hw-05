import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import css from "../MovieReviews/MovieReviews.module.css";

const API_KEY = "668eb06e858bc95bbf59ba222dcc3087";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${API_KEY}`
      )
      .then(response => { 
          // console.log("Fetched reviews:", response.data.results);
        setReviews(response.data.results || []);
      })
      .catch(error => console.error("Error fetching reviews:", error));
  }, [movieId]);

  return (
    <div>
      <h2>Reviews</h2>
      <ul>
        {reviews.length > 0 ? (
          reviews.map(review => (
            <li key={review.id}>
              <p className={css.author}>
                <strong>Author:</strong> {review.author}
              </p>
              <p className={css.content}>{review.content}</p>
              <a href={review.url} target="_blank" rel="noopener noreferrer">
                Read more
              </a>
            </li>
          ))
        ) : (
          <p>No reviews available.</p>
        )}
      </ul>
    </div>
  );
}
