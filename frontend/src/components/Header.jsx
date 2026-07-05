import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';
import { ThemeContext } from '../context/ThemeContext';

const Header = () => {
  const { userInfo, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/books?keyword=${keyword}`);
      setKeyword('');
    } else {
      navigate('/books');
    }
  };

  const cartItemsCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark glass-nav py-3" role="navigation" aria-label="Main navigation">
      <div className="container">
        {/* Brand */}
        <Link className="navbar-brand d-flex align-items-center fw-bold fs-4 text-white" to="/">
          <i className="bi bi-book-half me-2" style={{ color: 'var(--primary-color)' }} />
          Book<span style={{ color: 'var(--primary-color)' }}>Store</span>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ color: 'var(--text-secondary)' }}
        >
          <i className="bi bi-list fs-4" />
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          {/* Search Bar */}
          <form
            onSubmit={submitHandler}
            className="d-flex mx-auto col-lg-4 col-md-7 my-2 my-lg-0"
            role="search"
          >
            <div className="input-group">
              <input
                id="search-input"
                type="search"
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search books, authors, genres..."
                className="form-control premium-search"
                value={keyword}
                aria-label="Search books"
              />
              <button
                type="submit"
                className="btn btn-premium-primary px-3"
                aria-label="Submit search"
              >
                <i className="bi bi-search" />
              </button>
            </div>
          </form>

          {/* Right Links */}
          <ul className="navbar-nav ms-auto align-items-lg-center gap-1">
            {/* Browse */}
            <li className="nav-item">
              <Link
                className="nav-link d-flex align-items-center"
                to="/books"
                style={{ color: 'var(--text-secondary)' }}
              >
                <i className="bi bi-grid me-1" />
                Browse
              </Link>
            </li>

            {/* Dark Mode Toggle */}
            <li className="nav-item">
              <button
                id="dark-mode-toggle"
                className="btn btn-sm ms-1"
                onClick={toggleDarkMode}
                aria-label="Toggle dark mode"
                style={{
                  background: 'rgba(30,41,59,0.6)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-secondary)',
                  borderRadius: '10px',
                  padding: '6px 10px',
                }}
              >
                <i className={`bi ${darkMode ? 'bi-sun' : 'bi-moon-stars'}`} />
              </button>
            </li>

            {/* Wishlist (only logged in) */}
            {userInfo && (
              <li className="nav-item">
                <Link
                  to="/wishlist"
                  className="nav-link position-relative"
                  style={{ color: 'var(--text-secondary)' }}
                  aria-label="Wishlist"
                >
                  <i className="bi bi-heart fs-5" />
                  {wishlist.length > 0 && (
                    <span
                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                      style={{ background: '#ec4899', fontSize: '0.65rem' }}
                    >
                      {wishlist.length}
                    </span>
                  )}
                </Link>
              </li>
            )}

            {/* Cart */}
            <li className="nav-item">
              <Link
                to="/cart"
                className="nav-link position-relative"
                style={{ color: 'var(--text-secondary)' }}
                aria-label="Shopping cart"
              >
                <i className="bi bi-cart3 fs-5" />
                {cartItemsCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
            </li>

            {/* User Dropdown */}
            {userInfo ? (
              <li className="nav-item dropdown">
                <button
                  className="btn d-flex align-items-center gap-2 py-2 px-3"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{
                    background: 'rgba(99,102,241,0.15)',
                    border: '1px solid rgba(99,102,241,0.3)',
                    borderRadius: '12px',
                    color: 'white',
                  }}
                >
                  <i className="bi bi-person-circle" />
                  <span className="d-none d-lg-inline" style={{ maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {userInfo.name}
                  </span>
                  <i className="bi bi-chevron-down" style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }} />
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end p-2 border-0"
                  aria-labelledby="userDropdown"
                  style={{ background: '#1e293b', minWidth: '200px', borderRadius: '14px', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}
                >
                  <li className="px-2 pb-2" style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>Signed in as</div>
                    <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{userInfo.name}</div>
                  </li>
                  <li className="mt-1">
                    <Link className="dropdown-item rounded-2 py-2" to="/profile" style={{ color: 'var(--text-primary)' }}>
                      <i className="bi bi-person me-2" style={{ color: 'var(--primary-color)' }} />
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item rounded-2 py-2" to="/wishlist" style={{ color: 'var(--text-primary)' }}>
                      <i className="bi bi-heart me-2" style={{ color: '#ec4899' }} />
                      Wishlist {wishlist.length > 0 && `(${wishlist.length})`}
                    </Link>
                  </li>
                  {userInfo.isAdmin && (
                    <>
                      <li><hr className="dropdown-divider" style={{ borderColor: 'var(--border-color)' }} /></li>
                      <li>
                        <Link className="dropdown-item rounded-2 py-2" to="/admin/dashboard" style={{ color: '#f59e0b' }}>
                          <i className="bi bi-shield-lock me-2" />
                          Admin Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item rounded-2 py-2" to="/admin/books" style={{ color: 'var(--text-primary)' }}>
                          <i className="bi bi-book me-2" />
                          Manage Books
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item rounded-2 py-2" to="/admin/orders" style={{ color: 'var(--text-primary)' }}>
                          <i className="bi bi-bag me-2" />
                          Manage Orders
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item rounded-2 py-2" to="/admin/users" style={{ color: 'var(--text-primary)' }}>
                          <i className="bi bi-people me-2" />
                          Manage Users
                        </Link>
                      </li>
                    </>
                  )}
                  <li><hr className="dropdown-divider" style={{ borderColor: 'var(--border-color)' }} /></li>
                  <li>
                    <button
                      onClick={logout}
                      className="dropdown-item rounded-2 py-2"
                      style={{ color: '#ef4444' }}
                    >
                      <i className="bi bi-box-arrow-right me-2" />
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item ms-1">
                <Link id="sign-in-btn" className="btn btn-premium-primary" to="/login">
                  <i className="bi bi-box-arrow-in-right me-2" />
                  Sign In
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
