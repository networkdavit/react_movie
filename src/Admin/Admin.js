import { useState, useEffect, useRef } from 'react';
import './Admin.css';

function Admin() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [year, setYear] = useState('');
  const [editingMovie, setEditingMovie] = useState(null);
  const titleRef = useRef(null);
  const yearRef = useRef(null);
  const genreRef = useRef(null);
  const descriptionRef = useRef(null);
  const imageUrlRef = useRef(null);

  const handleEdit = (movie) => {
    setEditingMovie(movie);
  };

  const handleCancel = () => {
    setEditingMovie(null);
  };

  const handleSave = (id) => {
    const titleInput = titleRef.current;
    const descriptionInput = descriptionRef.current;
    const yearInput = yearRef.current;
    const genreInput = genreRef.current;
    const imageUrlInput = imageUrlRef.current;

    handleUpdate(id, {
      title: titleInput.value,
      year: yearInput.value,
      genre: genreInput.value,
      description: descriptionInput.value,
      imageUrl: imageUrlInput.value
    });
    setEditingMovie(null);
  };
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

  function handleDescriptioChange(event) {
    setDescription(event.target.value);
  }

  function handleImageUrlChange(event) {
    setImageUrl(event.target.value);
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
        description,
        imageUrl
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
        setDescription('');
        setImageUrl('');
        console.log(data, "asdftba")
        console.log(movies, "moviess")
      })
      .catch((error) => console.error(error));
  }


  function handleUpdate(id, updatedMovie) {
    const jwt = localStorage.getItem('access');
    if (!jwt) {
      console.log('JWT not found');
      return;
    }

    // Send PATCH request to server using JWT in header
    fetch(`http://localhost:8000/api/v1/movies/${id}/`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedMovie),
    })
      .then((response) => {
        if (response.status === 401) {
          return refreshToken().then((newToken) => {
            // Retry request with new access token
            return fetch(`http://localhost:8000/api/v1/movies/${id}/`, {
              method: 'PATCH',
              headers: {
                Authorization: `Bearer ${newToken}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(updatedMovie),
            });
          });
        }
        return response;
      })
      .then((response) => response.json())
      .then((data) => {
        const updatedMovies = movies.map((movie) => {
          if (movie.id === id) {
            return data;
          }
          return movie;
        });
        setMovies(updatedMovies);
        setTitle('');
        setGenre('');
        setYear('');
        setDescription('');
        setImageUrl('');
      })
      .catch((error) => console.error(error));
  }



  function handleDelete(id) {
    const jwt = localStorage.getItem('access');
    if (!jwt) {
      console.log('JWT not found');
      return;
    }

    // Send DELETE request to server using JWT in header
    fetch(`http://localhost:8000/api/v1/movies/${id}/`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((response) => {
        if (response.status === 401) {
          return refreshToken().then((newToken) => {
            // Retry request with new access token
            return fetch(`http://localhost:8000/api/v1/movies/${id}/`, {
              method: 'DELETE',
              headers: {
                Authorization: `Bearer ${newToken}`,
              },
            });
          });
        }
        return response;
      })
      .then(() => {
        // Update state to remove deleted movie
        setMovies(movies.filter((movie) => movie.id !== id));
      })
      .catch((error) => console.error(error));
  }


  return (
    <div className='addMoviePosition'>
      <h1>Welcome Admin</h1>

      <ul>
        {movies.map((movie) => (
          <li key={movie.id} className="movieList">

            {editingMovie && editingMovie.id === movie.id ? (
              <>
                <input
                  ref={titleRef}
                  type="text"
                  id={`title-${movie.id}`}
                  defaultValue={movie.title}
                  onChange={handleTitleChange}
                />
                <input
                  ref={genreRef}
                  type="text"
                  id={`genre-${movie.id}`}
                  defaultValue={movie.genre}
                  onChange={handleGenreChange}
                />
                <input
                  ref={descriptionRef}
                  type="text"
                  id={`description-${movie.description}`}
                  defaultValue={movie.description}
                  onChange={handleDescriptioChange}
                />
                <input
                  ref={imageUrlRef}
                  type="text"
                  id={`imageUrl-${movie.imageUrl}`}
                  defaultValue={movie.imageUrl}
                  onChange={handleImageUrlChange}
                />
                <input
                  ref={yearRef}
                  type="text"
                  id={`year-${movie.id}`}
                  defaultValue={movie.year}
                  onChange={handleYearChange}
                />

                <button onClick={() => handleSave(movie.id)}>Save</button>
                <button onClick={handleCancel}>Cancel</button>
              </>
            ) : (
              <>
                {movie.title} {movie.genre} -  {movie.year}
                <button onClick={() => handleEdit(movie)}>Edit</button>
                <button onClick={() => handleDelete(movie.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="movieList"
      >
        {!editingMovie ? (
          <>
          <h2>Create New Movie</h2>
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
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                id="description"
                value={description}
                onChange={handleDescriptioChange}
              />
              <label htmlFor="imageUrl">Image URL:</label>
              <input
                type="text"
                id="imageUrl"
                value={imageUrl}
                onChange={handleImageUrlChange}
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
            <button className="addButton" type="submit">Add Movie</button>
          </>
        ) : (
          <p>A movie is being edited, inputs are disabled.</p>
        )}

      </form>
      <span className='distance'>

      </span>
    </div>
  );
}

export default Admin;
