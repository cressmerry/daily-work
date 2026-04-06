import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        Notes<span className="nav-logo-sup">App</span>
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
          to="/add"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          Add Note
        </NavLink>
        <NavLink
          to="/notes"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          List Notes
        </NavLink>
        <NavLink
          to="/update"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          Update Note
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
