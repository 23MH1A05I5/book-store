import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import Loader from '../components/Loader';
import Message from '../components/Message';

const AdminOrderListPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/orders');
      setOrders(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  const markDelivered = async (id) => {
    setUpdatingId(id);
    try {
      await axios.put(`/api/orders/${id}/deliver`);
      setOrders((prev) =>
        prev.map((o) => (o._id === id ? { ...o, isDelivered: true, deliveredAt: new Date() } : o))
      );
    } catch (err) {
      alert(err.response?.data?.message || 'Update failed');
    } finally {
      setUpdatingId(null);
    }
  };

  const totalRevenue = orders
    .filter((o) => o.isPaid)
    .reduce((acc, o) => acc + (o.totalPrice || 0), 0);

  return (
    <div className="container py-5 animate-fade-in">
      <div className="row">
        <div className="col-lg-2 mb-4">
          <AdminSidebar />
        </div>
        <div className="col-lg-10">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="fw-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                Orders Management
              </h2>
              <p className="mb-0" style={{ color: 'var(--text-secondary)' }}>
                {orders.length} total orders · Revenue: <strong style={{ color: '#10b981' }}>${totalRevenue.toFixed(2)}</strong>
              </p>
            </div>
          </div>

          {/* Summary badges */}
          <div className="d-flex gap-3 mb-4 flex-wrap">
            {[
              { label: 'Total', value: orders.length, color: '#6366f1' },
              { label: 'Paid', value: orders.filter((o) => o.isPaid).length, color: '#10b981' },
              { label: 'Unpaid', value: orders.filter((o) => !o.isPaid).length, color: '#ef4444' },
              { label: 'Delivered', value: orders.filter((o) => o.isDelivered).length, color: '#06b6d4' },
              { label: 'Pending', value: orders.filter((o) => !o.isDelivered).length, color: '#f59e0b' },
            ].map((s) => (
              <div
                key={s.label}
                className="glass-panel px-4 py-2"
                style={{ border: `1px solid ${s.color}33` }}
              >
                <span style={{ color: s.color, fontWeight: 700, fontSize: '1.1rem' }}>{s.value}</span>
                <span className="ms-2" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{s.label}</span>
              </div>
            ))}
          </div>

          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <div className="glass-panel p-4">
              <div className="table-responsive">
                <table className="table table-premium mb-0">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Date</th>
                      <th>Total</th>
                      <th>Payment</th>
                      <th>Delivery</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td>
                          <Link
                            to={`/order/${order._id}`}
                            style={{ color: 'var(--primary-color)', fontSize: '0.8rem' }}
                          >
                            #{order._id.slice(-8).toUpperCase()}
                          </Link>
                        </td>
                        <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                          {order.user?.name || '—'}
                        </td>
                        <td style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                          ${order.totalPrice?.toFixed(2)}
                        </td>
                        <td>
                          {order.isPaid ? (
                            <span className="badge bg-success">
                              <i className="bi bi-check-circle me-1" />
                              Paid
                            </span>
                          ) : (
                            <span className="badge bg-danger">
                              <i className="bi bi-x-circle me-1" />
                              Unpaid
                            </span>
                          )}
                        </td>
                        <td>
                          {order.isDelivered ? (
                            <span className="badge bg-success">
                              <i className="bi bi-truck me-1" />
                              Delivered
                            </span>
                          ) : (
                            <span
                              className="badge"
                              style={{ background: 'rgba(245,158,11,0.2)', color: '#f59e0b' }}
                            >
                              Pending
                            </span>
                          )}
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <Link
                              to={`/order/${order._id}`}
                              className="btn btn-sm"
                              style={{
                                padding: '3px 10px',
                                fontSize: '0.75rem',
                                background: 'rgba(99,102,241,0.15)',
                                color: 'var(--primary-color)',
                                border: '1px solid rgba(99,102,241,0.3)',
                              }}
                            >
                              <i className="bi bi-eye" />
                            </Link>
                            {!order.isDelivered && order.isPaid && (
                              <button
                                className="btn btn-sm btn-premium-primary"
                                style={{ padding: '3px 10px', fontSize: '0.75rem' }}
                                onClick={() => markDelivered(order._id)}
                                disabled={updatingId === order._id}
                              >
                                {updatingId === order._id ? (
                                  <span className="spinner-border spinner-border-sm" />
                                ) : (
                                  <>
                                    <i className="bi bi-truck me-1" />
                                    Deliver
                                  </>
                                )}
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOrderListPage;
