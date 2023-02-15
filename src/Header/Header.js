import "./Header.css";
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";

function Header() {

    const [isLoggedIn, setLoggedIn] = useState(false);
    useEffect(() => {
        const jwt = localStorage.getItem('access');
        if (!jwt) {
            console.log('JWT not found');
            return;
        }

        fetch('http://localhost:8000/api/v1/auth/verify-token/', {
            method: "POST",
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        })
        .then((response) => {
            if (response.status === 401) {
                setLoggedIn(false);
            } else if (response.status === 200) {
                setLoggedIn(true);
            }
        })
    }, [setLoggedIn]);

    function handleLogout() {
        localStorage.clear();
        setLoggedIn(false);
        window.location.replace("/");
    }


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
                        <>
                            <li>
                                <Link to="/admin">Admin</Link>
                            </li>
                            <li>
                                <button className="link-button" onClick={handleLogout}>Log Out</button>
                            </li>
                        </>
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
