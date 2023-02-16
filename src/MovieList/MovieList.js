import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./MovieList.css";

function MoviesList() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:8000/api/v1/movies/")
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
            <div className="movie-box" key={movie.id}>
              <img src={movie.imageUrl}/>
              <Link to={`movie/${movie.id}`}><h3>{movie.title}</h3></Link>
              <p>{movie.genre}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MoviesList;
