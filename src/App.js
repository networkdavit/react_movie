import './App.css';
import MoviesList from './MovieList/MovieList';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './LoginForm/LoginForm';
import Admin from './Admin/Admin';
import About from './About/About';
import Movie from './Movie/Movie';

function App() {
  const isAuthenticated = localStorage.getItem('access') !== null;

  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<MoviesList />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route
            path="/admin"
            element={
              isAuthenticated ? (
                <Admin />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
        <Footer />
      </Router>


    </div>
  )
}

export default App;
