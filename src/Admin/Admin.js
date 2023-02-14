import { useState, useEffect } from 'react';

function Admin() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');

  useEffect(() => {
    // Check if JWT is present in local storage
    const jwt = localStorage.getItem('access');
    if (!jwt) {
      // Redirect to login page or show error message
      console.log('JWT not found');
      return;
    }

    // Fetch movies from server using JWT in header
    fetch('/api/movies', {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setMovies(data))
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
    fetch('/api/movies', {
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
        setMovies([...movies, data]);
        setTitle('');
        setGenre('');
        setYear('');
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
