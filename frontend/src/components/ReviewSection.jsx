import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Rating from './Rating';
import Loader from './Loader';
import Message from './Message';

/**
 * ReviewSection – displays existing reviews and allows adding a new review
 */
const ReviewSection = ({ bookId, reviews = [], numReviews, onReviewAdded }) => {
  const { userInfo } = useContext(AuthContext);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await axios.post(`/api/books/${bookId}/reviews`, { rating, comment });
      setSuccess(true);
      setComment('');
      setRating(5);
      if (onReviewAdded) onReviewAdded();
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to submit review'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-5">
      {/* Reviews Heading */}
      <h4 className="mb-4" style={{ color: 'var(--text-primary)' }}>
        <i className="bi bi-chat-square-quote-fill me-2" style={{ color: 'var(--primary-color)' }} />
        Reviews
        <span
          className="ms-2 badge"
          style={{
            background: 'rgba(99,102,241,0.15)',
            color: 'var(--primary-color)',
            fontSize: '0.85rem',
            padding: '4px 10px',
            borderRadius: '8px',
          }}
        >
          {numReviews}
        </span>
      </h4>

      {/* Existing Reviews */}
      {reviews.length === 0 ? (
        <p style={{ color: 'var(--text-secondary)' }}>No reviews yet. Be the first!</p>
      ) : (
        <div className="d-flex flex-column gap-3 mb-4">
          {reviews.map((review) => (
            <div key={review._id} className="glass-panel p-3">
              <div className="d-flex justify-content-between align-items-start mb-1">
                <strong style={{ color: 'var(--text-primary)' }}>{review.name}</strong>
                <small style={{ color: 'var(--text-secondary)' }}>
                  {new Date(review.createdAt).toLocaleDateString()}
                </small>
              </div>
              <Rating value={review.rating} />
              <p className="mt-2 mb-0" style={{ color: 'var(--text-secondary)' }}>
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Add Review Form */}
      <div className="glass-panel p-4 mt-4">
        <h5 className="mb-3" style={{ color: 'var(--text-primary)' }}>
          Write a Review
        </h5>

        {!userInfo ? (
          <Message variant="info">
            Please <a href="/login" style={{ color: 'var(--primary-color)' }}>sign in</a> to write a review.
          </Message>
        ) : (
          <>
            {success && <Message variant="success">Review submitted successfully!</Message>}
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader size="sm" text="" />}

            <form onSubmit={submitHandler}>
              <div className="mb-3">
                <label className="form-label" style={{ color: 'var(--text-secondary)' }}>
                  Rating
                </label>
                <select
                  className="form-select form-control-premium"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  style={{ maxWidth: '200px' }}
                >
                  <option value={5}>⭐⭐⭐⭐⭐ Excellent</option>
                  <option value={4}>⭐⭐⭐⭐ Good</option>
                  <option value={3}>⭐⭐⭐ Average</option>
                  <option value={2}>⭐⭐ Poor</option>
                  <option value={1}>⭐ Terrible</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label" style={{ color: 'var(--text-secondary)' }}>
                  Comment
                </label>
                <textarea
                  className="form-control form-control-premium"
                  rows={4}
                  placeholder="Share your thoughts about this book..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-premium-primary"
                disabled={loading}
              >
                <i className="bi bi-send-fill me-2" />
                Submit Review
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
