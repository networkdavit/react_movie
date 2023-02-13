import "./Header.css";
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="header">
            <h1 className="header-title">Movie Gallery</h1>
            <nav>
                <ul className="header-nav">
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
