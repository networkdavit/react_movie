import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./MovieList.css";
import api_endpoints from "../constants";

function MoviesList() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(api_endpoints.movies)
      .then(res => res.json())
      .then(data => {
        setMovies(data.results);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="movies-container">
      {error && <p>Something went wrong: {error.message}</p>}
      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        <div className="movies-list">
          {movies.map(movie => (
            <div key={movie.id}>
              <Link to={`movie/${movie.id}`}><div className="movie-box">
                <img src={movie.imageUrl} alt="" />
                <h3>{movie.title}</h3>
              </div></Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MoviesList;
