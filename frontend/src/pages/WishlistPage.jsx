import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { WishlistContext } from '../context/WishlistContext';
import BookCard from '../components/BookCard';
import Loader from '../components/Loader';

const WishlistPage = () => {
  const { wishlist, loading } = useContext(WishlistContext);

  return (
    <div className="container py-5 animate-fade-in">
      <div className="d-flex align-items-center gap-3 mb-5">
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.3rem',
          }}
        >
          <i className="bi bi-heart-fill text-white" />
        </div>
        <div>
          <h2 className="fw-bold mb-0" style={{ color: 'var(--text-primary)' }}>
            My Wishlist
          </h2>
          <p className="mb-0" style={{ color: 'var(--text-secondary)' }}>
            {wishlist.length} book{wishlist.length !== 1 ? 's' : ''} saved
          </p>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : wishlist.length === 0 ? (
        <div className="glass-panel text-center p-5">
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>💔</div>
          <h4 style={{ color: 'var(--text-primary)' }}>Your wishlist is empty</h4>
          <p style={{ color: 'var(--text-secondary)' }}>
            Browse books and click the heart icon to save your favorites.
          </p>
          <Link to="/books" className="btn btn-premium-primary mt-2">
            <i className="bi bi-search me-2" />
            Browse Books
          </Link>
        </div>
      ) : (
        <div className="row g-4">
          {wishlist.map((book) => (
            <div key={book._id} className="col-sm-6 col-md-4 col-lg-3">
              <BookCard book={book} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
