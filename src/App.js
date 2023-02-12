import './App.css';
import MoviesList from './MovieList/MovieList';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';


import LoginForm from './LoginForm/LoginForm';

function App() {

  return (
    <div className="App">      
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<MoviesList/>}  />
          {/* <Route path="/home" element={<Home/>} exact /> */}
          {/* <Route path="/services" element={<Services/>}  /> */}
          <Route path="/login" element={<LoginForm/>}  />
        </Routes> 
        <Footer/>
      </Router>
      
      
    </div>
  )
}

export default App;
