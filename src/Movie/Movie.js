import "./Movie.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Movie() {

    const { id } = useParams();
    const [movie, setMovie] = useState({});
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetch(`http://localhost:8000/api/v1/movies/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setMovie(data);
                }
                setIsLoading(false);
            })
            .catch(error => {
                setError(error);
                setIsLoading(false);
            });
    }, []);

    return (
        <div >
            {error && <p>Something went wrong: {error.message}</p>}
          {isLoading ? (
            <p>Loading ...</p>
          ) : (
            <div>
                <div className="container">
                  <img className="movieImg" alt="movie mage" src={movie.imageUrl}/>
                  <p>{movie.genre}</p>
                  <p>{movie.description}</p>
                  <p>{movie.year}</p>
                </div>

            </div>
          )}
        </div>
    )
}

export default Movie;