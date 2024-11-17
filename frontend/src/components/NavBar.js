import { NavLink } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to="/">Login</NavLink>
                </li>
                <li>
                    <NavLink to="/content">Content</NavLink>
                </li>
                <li>
                    <NavLink to="/register">Register</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;