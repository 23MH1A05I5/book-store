import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Rating from '../components/Rating';
import Message from '../components/Message';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const DetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Review states
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewError, setReviewError] = useState(null);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  // Cart state
  const [qty, setQty] = useState(1);

  const fetchBookDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(`/api/books/${id}`);
      setBook(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
    }
  };

  useEffect(() => {
    fetchBookDetails();
    setReviewSuccess(false);
  }, [id, reviewSuccess]);

  const addToCartHandler = () => {
    addToCart(book, qty);
    navigate('/cart');
  };

  const submitReviewHandler = async (e) => {
    e.preventDefault();
    setReviewLoading(true);
    setReviewError(null);
    try {
      await axios.post(`/api/books/${id}/reviews`, { rating, comment });
      setReviewSuccess(true);
      setComment('');
      setRating(5);
      setReviewLoading(false);
    } catch (err) {
      setReviewLoading(false);
      setReviewError(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
    }
  };

  return (
    <div className="container py-5">
      <Link className="btn btn-premium-primary mb-4" to="/">
        <i className="bi bi-arrow-left me-1"></i>Back to Catalog
      </Link>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
          <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : !book ? (
        <Message variant="warning">Book not found.</Message>
      ) : (
        <div className="animate-fade-in">
          {/* Main Book Detail Section */}
          <div className="row g-5 mb-5">
            {/* Book Image */}
            <div className="col-lg-5 col-md-6">
              <div className="details-img-wrapper">
                <img
                  src={book.image}
                  alt={book.title}
                  className="details-img"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=600';
                  }}
                />
              </div>
            </div>

            {/* Book Info Column */}
            <div className="col-lg-4 col-md-6">
              <span className="badge bg-primary badge-premium px-3 py-2 mb-3">{book.genre}</span>
              <h2 className="fw-bold mb-1">{book.title}</h2>
              <p className="text-secondary mb-3 fs-5">by <span className="text-white">{book.author}</span></p>
              
              <div className="mb-4">
                <Rating value={book.rating} text={`${book.numReviews} customer reviews`} />
              </div>
              
              <hr className="bg-secondary mb-4" />
              
              <h4 className="fw-bold text-warning mb-3">${book.price.toFixed(2)}</h4>
              
              <h6 className="fw-bold text-white mb-2">Description</h6>
              <p className="text-secondary leading-relaxed">{book.description}</p>
            </div>

            {/* Action Checkout Box */}
            <div className="col-lg-3">
              <div className="glass-panel p-4">
                <div className="d-flex justify-content-between mb-3 border-bottom border-secondary pb-3">
                  <span className="text-secondary">Price:</span>
                  <span className="fw-bold text-warning">${book.price.toFixed(2)}</span>
                </div>

                <div className="d-flex justify-content-between mb-3 border-bottom border-secondary pb-3">
                  <span className="text-secondary">Status:</span>
                  {book.countInStock > 0 ? (
                    <span className="text-success fw-medium">In Stock ({book.countInStock} left)</span>
                  ) : (
                    <span className="text-danger fw-medium">Out of Stock</span>
                  )}
                </div>

                {book.countInStock > 0 && (
                  <div className="d-flex justify-content-between align-items-center mb-4 border-bottom border-secondary pb-3">
                    <span className="text-secondary">Quantity:</span>
                    <select
                      className="form-select form-control-premium py-1 px-2"
                      style={{ width: '80px', fontSize: '0.9rem' }}
                      value={qty}
                      onChange={(e) => setQty(Number(e.target.value))}
                    >
                      {[...Array(book.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <button
                  onClick={addToCartHandler}
                  className="btn btn-premium-primary w-100"
                  disabled={book.countInStock === 0}
                >
                  <i className="bi bi-cart-plus me-2"></i>Add to Cart
                </button>
              </div>
            </div>
          </div>

          <hr className="bg-secondary my-5" />

          {/* Reviews Section */}
          <div className="row g-5">
            {/* Reviews List */}
            <div className="col-lg-6">
              <h3 className="fw-bold mb-4">Reviews</h3>
              {book.reviews.length === 0 ? (
                <Message variant="info">No reviews yet. Be the first to write one!</Message>
              ) : (
                <div className="d-flex flex-column gap-3">
                  {book.reviews.map((review) => (
                    <div key={review._id} className="glass-panel p-4 animate-fade-in">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <strong className="text-white">{review.name}</strong>
                        <span className="text-secondary small">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="mb-2">
                        <Rating value={review.rating} />
                      </div>
                      <p className="text-secondary mb-0">{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Review Submission Form */}
            <div className="col-lg-6">
              <h3 className="fw-bold mb-4">Write a Customer Review</h3>
              {reviewSuccess && (
                <Message variant="success">Review submitted successfully!</Message>
              )}
              {reviewError && <Message variant="danger">{reviewError}</Message>}

              {userInfo ? (
                <form onSubmit={submitReviewHandler} className="glass-panel p-4">
                  <div className="mb-3">
                    <label className="form-label text-secondary small fw-bold">RATING</label>
                    <select
                      className="form-select form-control-premium"
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                    >
                      <option value="5">5 - Excellent</option>
                      <option value="4">4 - Very Good</option>
                      <option value="3">3 - Good</option>
                      <option value="2">2 - Fair</option>
                      <option value="1">1 - Poor</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="form-label text-secondary small fw-bold">COMMENT</label>
                    <textarea
                      rows="4"
                      className="form-control form-control-premium"
                      placeholder="Share your thoughts about this book..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-premium-primary"
                    disabled={reviewLoading}
                  >
                    {reviewLoading ? 'Submitting...' : 'Submit Review'}
                  </button>
                </form>
              ) : (
                <Message variant="info">
                  Please <Link to="/login" className="text-warning fw-semibold text-decoration-none">sign in</Link> to write a review.
                </Message>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsPage;
