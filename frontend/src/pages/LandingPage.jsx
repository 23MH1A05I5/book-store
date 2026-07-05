import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BookCard from '../components/BookCard';
import Loader from '../components/Loader';

const GENRES = [
  { icon: 'bi-book', label: 'Classic Fiction', color: '#6366f1' },
  { icon: 'bi-lightning-charge', label: 'Science Fiction', color: '#06b6d4' },
  { icon: 'bi-magic', label: 'Fantasy', color: '#8b5cf6' },
  { icon: 'bi-heart', label: 'Romance', color: '#ec4899' },
  { icon: 'bi-search', label: 'Thriller', color: '#f59e0b' },
  { icon: 'bi-person-standing', label: 'Self-Help', color: '#10b981' },
  { icon: 'bi-graph-up', label: 'Finance', color: '#22c55e' },
  { icon: 'bi-brain', label: 'Psychology', color: '#a78bfa' },
];

const TESTIMONIALS = [
  {
    name: 'Priya Sharma',
    role: 'Avid Reader',
    text: 'BookStore completely transformed my reading experience. The curated selection and intuitive interface make it my go-to platform for discovering new books.',
    avatar: '👩‍💼',
    rating: 5,
  },
  {
    name: 'James Mitchell',
    role: 'Literature Professor',
    text: 'As someone who reads dozens of books a year, I appreciate the depth of the catalog and how easy it is to find exactly what I\'m looking for.',
    avatar: '👨‍🏫',
    rating: 5,
  },
  {
    name: 'Aisha Rahman',
    role: 'Book Club Organizer',
    text: 'The reviews and ratings system helps our book club make informed decisions. Delivery is fast and the books always arrive in perfect condition.',
    avatar: '👩‍🎓',
    rating: 5,
  },
];

const LandingPage = () => {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await axios.get('/api/books');
        setFeaturedBooks(data.filter((b) => b.isFeatured).slice(0, 4));
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="animate-fade-in">
      {/* ─── Hero Section ──────────────────────────────────────────────────────── */}
      <section
        className="position-relative d-flex align-items-center"
        style={{
          minHeight: '88vh',
          background:
            'radial-gradient(ellipse at 60% 50%, rgba(99,102,241,0.15) 0%, transparent 60%), radial-gradient(ellipse at 10% 80%, rgba(139,92,246,0.1) 0%, transparent 50%), var(--bg-body)',
          overflow: 'hidden',
        }}
      >
        {/* Floating orbs */}
        <div
          style={{
            position: 'absolute',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)',
            top: '-100px',
            right: '-100px',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)',
            bottom: '50px',
            left: '-50px',
            pointerEvents: 'none',
          }}
        />

        <div className="container py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div
                className="badge mb-4 px-3 py-2"
                style={{
                  background: 'rgba(99,102,241,0.15)',
                  border: '1px solid rgba(99,102,241,0.3)',
                  color: 'var(--primary-color)',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                }}
              >
                <i className="bi bi-star-fill me-2" />
                #1 Online BookStore Platform
              </div>

              <h1
                className="display-3 fw-bold mb-4"
                style={{
                  lineHeight: 1.15,
                  background: 'linear-gradient(135deg, #f8fafc 0%, #94a3b8 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Discover Your
                <br />
                <span
                  style={{
                    background: 'linear-gradient(135deg, var(--primary-color) 0%, #8b5cf6 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Next Great Read
                </span>
              </h1>

              <p
                className="lead mb-5"
                style={{ color: 'var(--text-secondary)', maxWidth: '480px' }}
              >
                Explore thousands of books across every genre. From timeless classics to modern
                bestsellers — your perfect book is just a click away.
              </p>

              <div className="d-flex flex-wrap gap-3">
                <Link to="/books" className="btn btn-premium-primary btn-lg px-5 py-3">
                  <i className="bi bi-search me-2" />
                  Browse Books
                </Link>
                <Link
                  to="/register"
                  className="btn btn-lg px-5 py-3"
                  style={{
                    background: 'rgba(30,41,59,0.6)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    borderRadius: '12px',
                  }}
                >
                  <i className="bi bi-person-plus me-2" />
                  Join Free
                </Link>
              </div>

              {/* Stats */}
              <div className="d-flex gap-5 mt-5">
                {[
                  { value: '20,000+', label: 'Books' },
                  { value: '50K+', label: 'Readers' },
                  { value: '4.9★', label: 'Rating' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div
                      className="fw-bold"
                      style={{ fontSize: '1.5rem', color: 'var(--primary-color)' }}
                    >
                      {stat.value}
                    </div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-lg-6">
              <div className="position-relative" style={{ height: '480px' }}>
                {/* Floating book stack visual */}
                {[
                  { color: '#6366f1', rotate: '-8deg', top: '60px', left: '20px', z: 1 },
                  { color: '#8b5cf6', rotate: '4deg', top: '30px', left: '120px', z: 2 },
                  { color: '#f59e0b', rotate: '-3deg', top: '80px', left: '220px', z: 3 },
                ].map((book, i) => (
                  <div
                    key={i}
                    style={{
                      position: 'absolute',
                      width: '140px',
                      height: '200px',
                      borderRadius: '8px',
                      background: `linear-gradient(135deg, ${book.color}33, ${book.color}55)`,
                      border: `1px solid ${book.color}44`,
                      transform: `rotate(${book.rotate})`,
                      top: book.top,
                      left: book.left,
                      zIndex: book.z,
                      boxShadow: `0 20px 40px ${book.color}22`,
                      backdropFilter: 'blur(8px)',
                    }}
                  />
                ))}
                <div
                  className="glass-panel p-4 d-flex align-items-center gap-3"
                  style={{
                    position: 'absolute',
                    bottom: '60px',
                    right: '0',
                    minWidth: '260px',
                    zIndex: 10,
                  }}
                >
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, var(--primary-color), #8b5cf6)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      flexShrink: 0,
                    }}
                  >
                    📚
                  </div>
                  <div>
                    <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                      Free Shipping
                    </div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                      On orders over $100
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Featured Books ────────────────────────────────────────────────────── */}
      <section className="py-5" style={{ background: 'rgba(15,23,42,0.5)' }}>
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="fw-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                Featured Books
              </h2>
              <p style={{ color: 'var(--text-secondary)' }}>
                Hand-picked favorites from our collection
              </p>
            </div>
            <Link
              to="/books"
              className="btn"
              style={{ color: 'var(--primary-color)', border: '1px solid rgba(99,102,241,0.4)' }}
            >
              View All <i className="bi bi-arrow-right ms-1" />
            </Link>
          </div>

          {loading ? (
            <Loader />
          ) : (
            <div className="row g-4">
              {featuredBooks.map((book) => (
                <div key={book._id} className="col-sm-6 col-lg-3">
                  <BookCard book={book} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── Genres ───────────────────────────────────────────────────────────── */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              Browse by Genre
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              Find books in your favorite categories
            </p>
          </div>
          <div className="row g-3">
            {GENRES.map((genre) => (
              <div key={genre.label} className="col-6 col-md-4 col-lg-3">
                <Link
                  to={`/books?genre=${encodeURIComponent(genre.label)}`}
                  className="glass-panel p-4 d-flex align-items-center gap-3 text-decoration-none"
                  style={{
                    borderRadius: '16px',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    border: `1px solid ${genre.color}22`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${genre.color}66`;
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = `${genre.color}22`;
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      background: `${genre.color}22`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2rem',
                      color: genre.color,
                      flexShrink: 0,
                    }}
                  >
                    <i className={`bi ${genre.icon}`} />
                  </div>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                    {genre.label}
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─────────────────────────────────────────────────────── */}
      <section className="py-5" style={{ background: 'rgba(15,23,42,0.5)' }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              What Our Readers Say
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              Trusted by thousands of book lovers worldwide
            </p>
          </div>
          <div className="row g-4">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="col-md-4">
                <div className="glass-panel p-4 h-100">
                  <div className="d-flex gap-1 mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <i key={i} className="bi bi-star-fill rating-star" />
                    ))}
                  </div>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                    "{t.text}"
                  </p>
                  <div className="d-flex align-items-center gap-3 mt-4">
                    <div style={{ fontSize: '2rem' }}>{t.avatar}</div>
                    <div>
                      <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                        {t.name}
                      </div>
                      <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                        {t.role}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────────────────────── */}
      <section className="py-5">
        <div className="container">
          <div
            className="glass-panel text-center p-5"
            style={{
              background:
                'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(139,92,246,0.1) 100%)',
              border: '1px solid rgba(99,102,241,0.2)',
            }}
          >
            <h2 className="fw-bold mb-3" style={{ color: 'var(--text-primary)', fontSize: '2rem' }}>
              Start Your Reading Journey Today
            </h2>
            <p className="mb-4" style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto 1.5rem' }}>
              Join thousands of readers. Browse, wishlist, and purchase your favorite books.
            </p>
            <Link to="/register" className="btn btn-premium-primary btn-lg px-5">
              <i className="bi bi-person-plus me-2" />
              Get Started Free
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
