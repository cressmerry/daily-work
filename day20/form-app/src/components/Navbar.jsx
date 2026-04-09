import { NavLink } from "react-router-dom";

import "./Navbar.css";
function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        Secu<span className="nav-logo-sup">Forms</span>
      </div>

      <div className="nav-links">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/demo"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          Demo
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
