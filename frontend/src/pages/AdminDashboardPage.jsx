import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import Loader from '../components/Loader';
import Message from '../components/Message';

const StatCard = ({ icon, label, value, color, linkTo }) => (
  <Link
    to={linkTo}
    className="glass-panel p-4 text-decoration-none d-flex align-items-center gap-4"
    style={{
      borderRadius: '16px',
      transition: 'all 0.3s ease',
      border: `1px solid ${color}22`,
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.borderColor = `${color}55`;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.borderColor = `${color}22`;
    }}
  >
    <div
      style={{
        width: '56px',
        height: '56px',
        borderRadius: '14px',
        background: `${color}22`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem',
        color,
        flexShrink: 0,
      }}
    >
      <i className={`bi ${icon}`} />
    </div>
    <div>
      <div
        style={{
          fontSize: '1.8rem',
          fontWeight: 700,
          color: 'var(--text-primary)',
          lineHeight: 1,
        }}
      >
        {value}
      </div>
      <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '4px' }}>
        {label}
      </div>
    </div>
  </Link>
);

const AdminDashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [lowStockBooks, setLowStockBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, ordersRes, booksRes] = await Promise.all([
          axios.get('/api/users'),
          axios.get('/api/orders'),
          axios.get('/api/books'),
        ]);

        const orders = ordersRes.data;
        const books = booksRes.data;
        const users = usersRes.data;

        const totalRevenue = orders
          .filter((o) => o.isPaid)
          .reduce((acc, o) => acc + o.totalPrice, 0);

        setStats({
          totalUsers: users.length,
          totalOrders: orders.length,
          totalBooks: books.length,
          totalRevenue: totalRevenue.toFixed(2),
          pendingOrders: orders.filter((o) => !o.isDelivered).length,
          paidOrders: orders.filter((o) => o.isPaid).length,
        });

        setRecentOrders(orders.slice(-5).reverse());
        setLowStockBooks(books.filter((b) => b.countInStock < 10).slice(0, 5));
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="container py-5"><Loader /></div>;
  if (error) return <div className="container py-5"><Message variant="danger">{error}</Message></div>;

  return (
    <div className="container py-5 animate-fade-in">
      <div className="row">
        {/* Sidebar */}
        <div className="col-lg-2 mb-4">
          <AdminSidebar />
        </div>

        {/* Main Content */}
        <div className="col-lg-10">
          <h2 className="fw-bold mb-1" style={{ color: 'var(--text-primary)' }}>
            Admin Dashboard
          </h2>
          <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
            Overview of your BookStore
          </p>

          {/* Stat Cards */}
          <div className="row g-3 mb-5">
            <div className="col-sm-6 col-xl-3">
              <StatCard icon="bi-people-fill" label="Total Users" value={stats.totalUsers} color="#6366f1" linkTo="/admin/users" />
            </div>
            <div className="col-sm-6 col-xl-3">
              <StatCard icon="bi-bag-fill" label="Total Orders" value={stats.totalOrders} color="#06b6d4" linkTo="/admin/orders" />
            </div>
            <div className="col-sm-6 col-xl-3">
              <StatCard icon="bi-book-fill" label="Total Books" value={stats.totalBooks} color="#8b5cf6" linkTo="/admin/books" />
            </div>
            <div className="col-sm-6 col-xl-3">
              <StatCard icon="bi-currency-dollar" label="Revenue" value={`$${stats.totalRevenue}`} color="#10b981" linkTo="/admin/orders" />
            </div>
          </div>

          <div className="row g-4">
            {/* Recent Orders */}
            <div className="col-lg-7">
              <div className="glass-panel p-4">
                <h5 className="fw-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                  <i className="bi bi-clock-history me-2" style={{ color: 'var(--primary-color)' }} />
                  Recent Orders
                </h5>
                <div className="table-responsive">
                  <table className="table table-premium mb-0">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>User</th>
                        <th>Total</th>
                        <th>Paid</th>
                        <th>Delivered</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr key={order._id}>
                          <td>
                            <Link
                              to={`/order/${order._id}`}
                              style={{ color: 'var(--primary-color)', fontSize: '0.8rem' }}
                            >
                              {order._id.slice(-6).toUpperCase()}
                            </Link>
                          </td>
                          <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                            {order.user?.name || '—'}
                          </td>
                          <td style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                            ${order.totalPrice?.toFixed(2)}
                          </td>
                          <td>
                            {order.isPaid ? (
                              <span className="badge bg-success">Paid</span>
                            ) : (
                              <span className="badge bg-danger">Unpaid</span>
                            )}
                          </td>
                          <td>
                            {order.isDelivered ? (
                              <span className="badge bg-success">Delivered</span>
                            ) : (
                              <span className="badge bg-warning text-dark">Pending</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Link
                  to="/admin/orders"
                  className="d-inline-block mt-3"
                  style={{ color: 'var(--primary-color)', fontSize: '0.85rem' }}
                >
                  View all orders <i className="bi bi-arrow-right ms-1" />
                </Link>
              </div>
            </div>

            {/* Low Stock Alert */}
            <div className="col-lg-5">
              <div className="glass-panel p-4 h-100">
                <h5 className="fw-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                  <i className="bi bi-exclamation-triangle-fill me-2" style={{ color: '#f59e0b' }} />
                  Low Stock Alert
                </h5>
                {lowStockBooks.length === 0 ? (
                  <p style={{ color: 'var(--text-secondary)' }}>All books are well stocked! ✅</p>
                ) : (
                  <div className="d-flex flex-column gap-3">
                    {lowStockBooks.map((book) => (
                      <div
                        key={book._id}
                        className="d-flex justify-content-between align-items-center p-2"
                        style={{
                          borderBottom: '1px solid var(--border-color)',
                          paddingBottom: '0.75rem',
                        }}
                      >
                        <div>
                          <div
                            style={{
                              color: 'var(--text-primary)',
                              fontSize: '0.9rem',
                              fontWeight: 500,
                            }}
                          >
                            {book.title.length > 28 ? book.title.slice(0, 28) + '…' : book.title}
                          </div>
                          <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
                            {book.author}
                          </div>
                        </div>
                        <span
                          className="badge"
                          style={{
                            background: book.countInStock === 0 ? 'rgba(239,68,68,0.2)' : 'rgba(245,158,11,0.2)',
                            color: book.countInStock === 0 ? '#ef4444' : '#f59e0b',
                            fontSize: '0.75rem',
                          }}
                        >
                          {book.countInStock === 0 ? 'Out of stock' : `${book.countInStock} left`}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                <Link
                  to="/admin/books"
                  className="d-inline-block mt-3"
                  style={{ color: 'var(--primary-color)', fontSize: '0.85rem' }}
                >
                  Manage inventory <i className="bi bi-arrow-right ms-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
