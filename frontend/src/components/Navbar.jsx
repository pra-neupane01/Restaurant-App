import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { count } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="navbar__brand">
          <span className="navbar__logo">🍽️</span>
          <span>
            Foodie<span className="text-accent">Hub</span>
          </span>
        </Link>

        <nav className="navbar__links">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/restaurants">Restaurants</NavLink>
          <NavLink to="/foods">Menu</NavLink>
          <NavLink to="/categories">Categories</NavLink>
          {isAdmin && (
            <NavLink to="/admin" className="navbar__admin">
              Admin
            </NavLink>
          )}
        </nav>

        <div className="navbar__actions">
          <Link to="/cart" className="navbar__cart">
            Cart
            {count > 0 && <span className="badge">{count}</span>}
          </Link>

          {isAuthenticated ? (
            <>
              <Link to="/profile" className="navbar__user">
                {user?.userName || 'Profile'}
              </Link>
              <button type="button" className="btn btn--ghost btn--sm" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn--ghost btn--sm">
                Login
              </Link>
              <Link to="/register" className="btn btn--primary btn--sm">
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
