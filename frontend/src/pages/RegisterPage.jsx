import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Message from '../components/Message';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState(null);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const { userInfo, register, error, setError, loading } = useContext(AuthContext);

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
    setError(null);
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLocalError(null);

    if (password !== confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }

    try {
      await register(name, email, password);
    } catch (err) {
      // Error handled by AuthContext
    }
  };

  return (
    <div className="container py-5 d-flex justify-content-center">
      <div className="col-12 col-md-8 col-lg-5 animate-fade-in">
        <div className="glass-panel p-5">
          <h2 className="fw-bold mb-4 text-center">Register Account</h2>

          {(error || localError) && (
            <Message variant="danger">{localError || error}</Message>
          )}

          <form onSubmit={submitHandler}>
            <div className="mb-3">
              <label className="form-label text-secondary small fw-bold">FULL NAME</label>
              <input
                type="text"
                placeholder="Enter name"
                className="form-control form-control-premium"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

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

            <div className="mb-3">
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

            <div className="mb-4">
              <label className="form-label text-secondary small fw-bold">CONFIRM PASSWORD</label>
              <input
                type="password"
                placeholder="Confirm password"
                className="form-control form-control-premium"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-premium-primary w-100 mb-3"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Register'}
            </button>
          </form>

          <div className="text-center mt-4">
            <span className="text-secondary small">Already have an account? </span>
            <Link
              to={redirect !== '/' ? `/login?redirect=${redirect}` : '/login'}
              className="text-warning small text-decoration-none fw-semibold"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
