import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { WishlistContext } from '../context/WishlistContext';
import { AuthContext } from '../context/AuthContext';
import Rating from './Rating';

const BookCard = ({ book }) => {
  const { userInfo } = useContext(AuthContext);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
  const inWishlist = isInWishlist(book._id);

  const handleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!userInfo) {
      window.location.href = '/login';
      return;
    }
    await toggleWishlist(book._id);
  };

  return (
    <div className="card book-card text-white h-100">
      {/* Book Image */}
      <Link to={`/book/${book._id}`}>
        <div className="book-card-img-wrapper">
          <img
            src={book.image}
            alt={book.title}
            className="book-card-img"
            onError={(e) => {
              e.target.src =
                'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400';
            }}
          />
          {/* Wishlist Button Overlay */}
          <button
            onClick={handleWishlist}
            aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'rgba(15,23,42,0.8)',
              border: `1px solid ${inWishlist ? '#ec4899' : 'rgba(255,255,255,0.1)'}`,
              color: inWishlist ? '#ec4899' : 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              fontSize: '1rem',
              zIndex: 2,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(236,72,153,0.2)';
              e.currentTarget.style.borderColor = '#ec4899';
              e.currentTarget.style.color = '#ec4899';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(15,23,42,0.8)';
              e.currentTarget.style.borderColor = inWishlist ? '#ec4899' : 'rgba(255,255,255,0.1)';
              e.currentTarget.style.color = inWishlist ? '#ec4899' : 'var(--text-secondary)';
            }}
          >
            <i className={`bi ${inWishlist ? 'bi-heart-fill' : 'bi-heart'}`} />
          </button>
        </div>
      </Link>

      {/* Card Body */}
      <div className="card-body d-flex flex-column justify-content-between p-4">
        <div>
          <span
            className="badge mb-2"
            style={{
              background: 'rgba(99,102,241,0.15)',
              color: 'var(--primary-color)',
              padding: '4px 10px',
              borderRadius: '8px',
              fontSize: '0.7rem',
            }}
          >
            {book.genre}
          </span>
          <Link to={`/book/${book._id}`} className="text-decoration-none">
            <h5
              className="card-title fw-semibold mb-1 text-truncate"
              title={book.title}
              style={{ color: 'var(--text-primary)' }}
            >
              {book.title}
            </h5>
          </Link>
          <p className="small mb-3" style={{ color: 'var(--text-secondary)' }}>
            by {book.author}
          </p>
        </div>

        <div>
          <div className="mb-3">
            <Rating value={book.rating} text={`${book.numReviews} reviews`} />
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <span className="fs-4 fw-bold" style={{ color: 'var(--secondary-color)' }}>
              ${book.price.toFixed(2)}
            </span>
            {book.countInStock > 0 ? (
              <span className="text-success small d-flex align-items-center gap-1">
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: 'currentColor',
                    display: 'inline-block',
                  }}
                />
                In Stock
              </span>
            ) : (
              <span className="text-danger small d-flex align-items-center gap-1">
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: 'currentColor',
                    display: 'inline-block',
                  }}
                />
                Out of Stock
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
