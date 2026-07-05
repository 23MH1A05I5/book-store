import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Message from '../components/Message';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const { userInfo, login, error, setError, loading } = useContext(AuthContext);

  useEffect(() => {
    // If user is already logged in, redirect them
    if (userInfo) {
      navigate(redirect);
    }
    // Clean up error state when page loads
    setError(null);
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      // Error handled by AuthContext
    }
  };

  return (
    <div className="container py-5 d-flex justify-content-center">
      <div className="col-12 col-md-8 col-lg-5 animate-fade-in">
        <div className="glass-panel p-5">
          <h2 className="fw-bold mb-4 text-center">Sign In</h2>

          {error && <Message variant="danger">{error}</Message>}

          <form onSubmit={submitHandler}>
            <div className="mb-3">
              <label className="form-label text-secondary small fw-bold">EMAIL ADDRESS</label>
              <input
                type="email"
                placeholder="Enter email"
                className="form-control form-control-premium"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label text-secondary small fw-bold">PASSWORD</label>
              <input
                type="password"
                placeholder="Enter password"
                className="form-control form-control-premium"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-premium-primary w-100 mb-3"
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="text-center mt-4">
            <span className="text-secondary small">New Customer? </span>
            <Link
              to={redirect !== '/' ? `/register?redirect=${redirect}` : '/register'}
              className="text-warning small text-decoration-none fw-semibold"
            >
              Register Here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
