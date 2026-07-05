import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import BookCard from '../components/BookCard';
import Message from '../components/Message';

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search and Filter States
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';

  const [selectedGenre, setSelectedGenre] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [rating, setRating] = useState('');

  // Static genres list
  const genres = [
    'Web Development',
    'Databases',
    'Software Design',
    'Software Engineering',
  ];

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        let url = `/api/books?keyword=${keyword}`;
        if (selectedGenre) {
          url += `&genre=${selectedGenre}`;
        }
        if (minPrice) {
          url += `&minPrice=${minPrice}`;
        }
        if (maxPrice) {
          url += `&maxPrice=${maxPrice}`;
        }
        if (rating) {
          url += `&rating=${rating}`;
        }

        const { data } = await axios.get(url);
        setBooks(data);
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

    fetchBooks();
  }, [keyword, selectedGenre, minPrice, maxPrice, rating]);

  const resetFilters = () => {
    setSelectedGenre('');
    setMinPrice('');
    setMaxPrice('');
    setRating('');
    setSearchParams({});
  };

  return (
    <div className="container py-4">
      {/* Hero Banner */}
      {!keyword && (
        <div className="p-5 mb-5 rounded-4 glass-panel border-0 text-white animate-fade-in" style={{
          background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.9) 100%)',
          boxShadow: '0 10px 40px rgba(99, 102, 241, 0.15)'
        }}>
          <div className="row align-items-center">
            <div className="col-lg-7">
              <span className="badge bg-primary mb-3 badge-premium px-3 py-2 fs-6">Welcome to BookStore</span>
              <h1 className="display-4 fw-extrabold text-white mb-3">
                Discover Your Next <span className="text-primary">Great Read</span>
              </h1>
              <p className="lead text-secondary mb-4">
                Explore our curated collection of software development manuals, technical references, and classics, built on premium developer patterns.
              </p>
              <div className="d-flex gap-3">
                <a href="#catalog" className="btn btn-premium-primary">
                  Browse Collection
                </a>
              </div>
            </div>
            <div className="col-lg-5 d-none d-lg-block text-center">
              <i className="bi bi-book-half text-primary" style={{ fontSize: '10rem', filter: 'drop-shadow(0 15px 30px rgba(99, 102, 241, 0.3))' }}></i>
            </div>
          </div>
        </div>
      )}

      {/* Main Catalog Section */}
      <div id="catalog" className="row pt-2">
        {/* Filters Sidebar */}
        <div className="col-lg-3 mb-4">
          <div className="glass-panel p-4 sticky-top" style={{ top: '100px', zIndex: 10 }}>
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h5 className="mb-0 fw-bold d-flex align-items-center">
                <i className="bi bi-funnel text-primary me-2"></i>Filters
              </h5>
              {(selectedGenre || minPrice || maxPrice || rating || keyword) && (
                <button
                  onClick={resetFilters}
                  className="btn btn-link text-warning p-0 text-decoration-none small"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Keyword Search Info */}
            {keyword && (
              <div className="mb-4">
                <label className="text-secondary small fw-bold mb-2">SEARCHING FOR</label>
                <div className="d-flex align-items-center justify-content-between p-2 bg-dark rounded-3 border border-secondary">
                  <span className="text-white small text-truncate">"{keyword}"</span>
                  <button onClick={() => setSearchParams({})} className="btn btn-link text-danger p-0 ms-2">
                    <i className="bi bi-x-circle-fill"></i>
                  </button>
                </div>
              </div>
            )}

            {/* Genre Filter */}
            <div className="mb-4">
              <label className="text-secondary small fw-bold mb-2">GENRE</label>
              <div className="d-flex flex-column gap-2">
                {genres.map((g) => (
                  <button
                    key={g}
                    onClick={() => setSelectedGenre(selectedGenre === g ? '' : g)}
                    className={`btn text-start py-2 px-3 rounded-3 border-0 transition-all ${
                      selectedGenre === g
                        ? 'btn-premium-primary text-white'
                        : 'bg-dark text-secondary hover-bg-primary hover-text-white'
                    }`}
                    style={{ fontSize: '0.9rem' }}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="mb-4">
              <label className="text-secondary small fw-bold mb-2">PRICE RANGE ($)</label>
              <div className="d-flex align-items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="form-control form-control-premium p-2"
                  style={{ fontSize: '0.85rem' }}
                />
                <span className="text-secondary">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="form-control form-control-premium p-2"
                  style={{ fontSize: '0.85rem' }}
                />
              </div>
            </div>

            {/* Rating Filter */}
            <div className="mb-2">
              <label className="text-secondary small fw-bold mb-2">MINIMUM RATING</label>
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="form-select form-control-premium"
                style={{ fontSize: '0.9rem' }}
              >
                <option value="">Any Rating</option>
                <option value="4.5">4.5 ★ & Up</option>
                <option value="4.0">4.0 ★ & Up</option>
                <option value="3.5">3.5 ★ & Up</option>
                <option value="3.0">3.0 ★ & Up</option>
              </select>
            </div>
          </div>
        </div>

        {/* Books List Grid */}
        <div className="col-lg-9">
          {loading ? (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
              <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : books.length === 0 ? (
            <div className="glass-panel p-5 text-center">
              <i className="bi bi-emoji-frown text-secondary display-1 mb-3"></i>
              <h4 className="fw-semibold">No Books Found</h4>
              <p className="text-secondary mb-4">Try adjusting your filters or search terms.</p>
              <button onClick={resetFilters} className="btn btn-premium-primary">
                View All Books
              </button>
            </div>
          ) : (
            <div className="row g-4">
              {books.map((book) => (
                <div className="col-md-6 col-xl-4 animate-fade-in" key={book._id}>
                  <BookCard book={book} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
