import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Message from '../components/Message';

const ProfilePage = () => {
  const { userInfo, updateProfile, error, setError } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  // Orders history states
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState(null);

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
    setError(null);
  }, [userInfo]);

  useEffect(() => {
    const fetchMyOrders = async () => {
      setOrdersLoading(true);
      setOrdersError(null);
      try {
        const { data } = await axios.get('/api/orders/myorders');
        setOrders(data);
        setOrdersLoading(false);
      } catch (err) {
        setOrdersLoading(false);
        setOrdersError(
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message
        );
      }
    };

    fetchMyOrders();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLocalError(null);
    setSuccess(false);

    if (password !== confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }

    setUpdateLoading(true);
    try {
      await updateProfile({ id: userInfo._id, name, email, password });
      setSuccess(true);
      setPassword('');
      setConfirmPassword('');
      setUpdateLoading(false);
    } catch (err) {
      setUpdateLoading(false);
    }
  };

  return (
    <div className="container py-5 animate-fade-in">
      <div className="row g-5">
        {/* Profile Update Form Column */}
        <div className="col-lg-4">
          <div className="glass-panel p-4">
            <h3 className="fw-bold mb-4">User Profile</h3>

            {(error || localError) && (
              <Message variant="danger">{localError || error}</Message>
            )}
            {success && <Message variant="success">Profile updated successfully!</Message>}

            <form onSubmit={submitHandler}>
              <div className="mb-3">
                <label className="form-label text-secondary small fw-bold">NAME</label>
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
                <label className="form-label text-secondary small fw-bold">CHANGE PASSWORD</label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  className="form-control form-control-premium"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="form-label text-secondary small fw-bold">CONFIRM NEW PASSWORD</label>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  className="form-control form-control-premium"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="btn btn-premium-primary w-100"
                disabled={updateLoading}
              >
                {updateLoading ? 'Updating...' : 'Update Details'}
              </button>
            </form>
          </div>
        </div>

        {/* Orders History Column */}
        <div className="col-lg-8">
          <h3 className="fw-bold mb-4">Purchase History</h3>
          {ordersLoading ? (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : ordersError ? (
            <Message variant="danger">{ordersError}</Message>
          ) : orders.length === 0 ? (
            <Message variant="info">You haven't placed any orders yet.</Message>
          ) : (
            <div className="table-responsive rounded-3 border border-secondary">
              <table className="table table-premium mb-0 align-middle">
                <thead>
                  <tr>
                    <th>ORDER ID</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th className="text-end">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="animate-fade-in">
                      <td className="small font-monospace text-warning">{order._id}</td>
                      <td className="small text-secondary">{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td className="fw-bold">${order.totalPrice.toFixed(2)}</td>
                      <td>
                        {order.isPaid ? (
                          <span className="text-success small">
                            <i className="bi bi-check-circle-fill me-1"></i>
                            {new Date(order.paidAt).toLocaleDateString()}
                          </span>
                        ) : (
                          <span className="text-danger small">
                            <i className="bi bi-x-circle-fill me-1"></i>No
                          </span>
                        )}
                      </td>
                      <td>
                        {order.isDelivered ? (
                          <span className="text-success small">
                            <i className="bi bi-check-circle-fill me-1"></i>
                            {new Date(order.deliveredAt).toLocaleDateString()}
                          </span>
                        ) : (
                          <span className="text-danger small">
                            <i className="bi bi-x-circle-fill me-1"></i>No
                          </span>
                        )}
                      </td>
                      <td className="text-end">
                        <Link to={`/orders/${order._id}`} className="btn btn-premium-primary py-1 px-3 btn-sm">
                          Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
