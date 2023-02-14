import { useState, useEffect } from 'react';

function Admin() {
  console.log(localStorage.getItem('access'))
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');

  async function refreshToken() {
    try {
      const response = await fetch('http://localhost:8000/api/v1/auth/token/refresh/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh: localStorage.getItem('refresh') }),
      });
      if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem('access', data.access);
        return data.access;
      } else {
        throw new Error('Error refreshing token');
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    // Check if JWT is present in local storage
    const jwt = localStorage.getItem('access');
    if (!jwt) {
      // Redirect to login page or show error message
      console.log('JWT not found');
      return;
    }

    // Fetch movies from server using JWT in header
    fetch('http://localhost:8000/api/v1/movies', {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((response) => {
        if (response.status === 401) {
          return refreshToken().then((newToken) => {
            // Retry request with new access token
            return fetch('http://localhost:8000/api/v1/movies', {
              headers: {
                Authorization: `Bearer ${newToken}`,
              },
            });
          });
        }
        return response;
      })
      .then((response) => response.json())
      .then((data) => setMovies(data.results))
      .catch((error) => console.error(error));
  }, []);

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  function handleGenreChange(event) {
    setGenre(event.target.value);
  }

  function handleYearChange(event) {
    setYear(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const jwt = localStorage.getItem('access');
    if (!jwt) {
      console.log('JWT not found');
      return;
    }

    // Send movie data to server using JWT in header
    fetch('http://localhost:8000/api/v1/movies/', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        genre,
        year,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "asdf")
        console.log(data.results, "datares")

        setMovies([...movies, data]);
        setTitle('');
        setGenre('');
        setYear('');
        console.log(data, "asdftba")
        console.log(movies, "moviess")
      })
      .catch((error) => console.error(error));
  }

  return (
    <div>
      <h1>Admin Component</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <label htmlFor="genre">Genre:</label>
          <input
            type="text"
            id="genre"
            value={genre}
            onChange={handleGenreChange}
          />
        </div>
        <div>
          <label htmlFor="year">Year:</label>
          <input
            type="text"
            id="year"
            value={year}
            onChange={handleYearChange}
          />
        </div>
        <button type="submit">Add Movie</button>
      </form>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            {movie.title} ({movie.year}) - {movie.genre}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Admin;
