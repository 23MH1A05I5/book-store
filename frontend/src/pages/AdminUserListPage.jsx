import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import Loader from '../components/Loader';
import Message from '../components/Message';

const AdminUserListPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/users');
      setUsers(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const deleteHandler = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    setDeleteId(id);
    try {
      await axios.delete(`/api/users/${id}`);
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed');
    } finally {
      setDeleteId(null);
    }
  };

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
                Users Management
              </h2>
              <p className="mb-0" style={{ color: 'var(--text-secondary)' }}>
                {users.length} registered users
              </p>
            </div>
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
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Joined</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id}>
                        <td style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
                          {user._id.slice(-6).toUpperCase()}
                        </td>
                        <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                          {user.name}
                        </td>
                        <td style={{ color: 'var(--text-secondary)' }}>
                          <a href={`mailto:${user.email}`} style={{ color: 'var(--text-secondary)' }}>
                            {user.email}
                          </a>
                        </td>
                        <td>
                          {user.isAdmin ? (
                            <span
                              className="badge"
                              style={{
                                background: 'rgba(99,102,241,0.2)',
                                color: 'var(--primary-color)',
                              }}
                            >
                              <i className="bi bi-shield-fill me-1" />
                              Admin
                            </span>
                          ) : (
                            <span
                              className="badge"
                              style={{
                                background: 'rgba(148,163,184,0.15)',
                                color: 'var(--text-secondary)',
                              }}
                            >
                              User
                            </span>
                          )}
                        </td>
                        <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td>
                          {!user.isAdmin && (
                            <button
                              className="btn btn-sm btn-premium-danger"
                              style={{ padding: '4px 12px', fontSize: '0.8rem' }}
                              onClick={() => deleteHandler(user._id)}
                              disabled={deleteId === user._id}
                            >
                              {deleteId === user._id ? (
                                <span className="spinner-border spinner-border-sm" />
                              ) : (
                                <i className="bi bi-trash" />
                              )}
                            </button>
                          )}
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

export default AdminUserListPage;
