import "./Header.css";
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";

const Header = () => {
    const [isLoggedIn, setLoggedIN] = useState(false);
    useEffect(() => {
        const jwt = localStorage.getItem('access');
        if (!jwt) {
          console.log('JWT not found');
          return;
        }
        console.log(jwt)
        fetch('http://localhost:8000/api/v1/auth/verify-token/', {
          method: "POST",
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
          .then((response) => {
            if (response.status === 401) {
                setLoggedIN(false);
            }else if(response.status === 200){
                setLoggedIN(true);
            }

          })
      }, []);
      
    return (
        <header className="header">
            <h1 className="header-title">Movie Gallery</h1>
            <nav>
                <ul className="header-nav">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    {isLoggedIn ? (
                        <li>
                            <Link to="/admin">Admin</Link>
                        </li>
                    ) : (
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
