import { NavLink, useNavigate } from "react-router-dom";
import AuthService from '../services/auth.service.js';
import "./NavBar.css";

const NavBar = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await AuthService.logout();
            // Force a page reload to clear any remaining state
            window.location.href = '/login';
            // Or alternatively:
            // navigate('/login', { replace: true });
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <div className="navbar">
            <nav>
                <ul>
                    <li>
                        <NavLink to="/home" className="navbar-link">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/content" className="navbar-link">Content</NavLink>
                    </li>
                    <li>
                        <NavLink to="/settings" className="navbar-link">Settings</NavLink>
                    </li>
                    <li>
                        <button onClick={handleLogout} className="logout-button">
                            Logout
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default NavBar;