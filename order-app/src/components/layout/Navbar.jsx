import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center font-bold">
            O
          </div>
          <span className="text-xl font-bold tracking-tight">
            ORDER<span className="text-blue-400">FLOW</span>
          </span>
        </Link>

        <div className="flex gap-8 items-center">
          <Link
            to="/"
            className="text-slate-300 hover:text-white transition font-medium"
          >
            Home
          </Link>
          {user ? (
            <>
              <Link
                to="/order"
                className="text-slate-300 hover:text-white transition font-medium"
              >
                Dashboard
              </Link>
              <div className="flex items-center gap-4 ml-4 pl-4 border-l border-slate-700">
                <span className="text-slate-400 text-sm italic">
                  {user.username}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500/10 text-red-400 px-4 py-1.5 rounded-lg border border-red-500/20 hover:bg-red-500 hover:text-white transition-all text-sm font-bold"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="flex gap-4">
              <Link
                to="/login"
                className="text-slate-300 hover:text-white pt-2"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 px-5 py-2 rounded-lg font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
