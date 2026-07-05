import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Message from '../components/Message';

const AdminBookListPage = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [createLoading, setCreateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchBooks = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get('/api/books');
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

  useEffect(() => {
    fetchBooks();
  }, []);

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      setDeleteLoading(true);
      try {
        await axios.delete(`/api/books/${id}`);
        await fetchBooks();
        setDeleteLoading(false);
      } catch (err) {
        setDeleteLoading(false);
        alert(
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message
        );
      }
    }
  };

  const createBookHandler = async () => {
    setCreateLoading(true);
    try {
      const { data } = await axios.post('/api/books', {});
      setCreateLoading(false);
      navigate(`/admin/book/${data._id}/edit`);
    } catch (err) {
      setCreateLoading(false);
      alert(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
    }
  };

  return (
    <div className="container py-5 animate-fade-in">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h2 className="fw-bold mb-0">Book Inventory</h2>
        <button
          onClick={createBookHandler}
          className="btn btn-premium-primary"
          disabled={createLoading}
        >
          <i className="bi bi-plus-lg me-2"></i>Add New Book
        </button>
      </div>

      {error && <Message variant="danger">{error}</Message>}

      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : books.length === 0 ? (
        <Message variant="info">No books in catalog.</Message>
      ) : (
        <div className="table-responsive rounded-3 border border-secondary">
          <table className="table table-premium mb-0 align-middle">
            <thead>
              <tr>
                <th>ID</th>
                <th>TITLE</th>
                <th>PRICE</th>
                <th>GENRE</th>
                <th>AUTHOR</th>
                <th className="text-end">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book._id}>
                  <td className="small font-monospace text-secondary">{book._id}</td>
                  <td className="fw-bold text-white text-truncate" style={{ maxWidth: '250px' }}>
                    {book.title}
                  </td>
                  <td className="text-warning fw-medium">${book.price.toFixed(2)}</td>
                  <td>
                    <span className="badge bg-dark-subtle text-primary badge-premium py-1">
                      {book.genre}
                    </span>
                  </td>
                  <td className="small text-secondary">{book.author}</td>
                  <td className="text-end">
                    <div className="d-inline-flex gap-2">
                      <Link
                        to={`/admin/book/${book._id}/edit`}
                        className="btn btn-premium-secondary btn-sm px-3 py-1"
                      >
                        <i className="bi bi-pencil-square"></i>
                      </Link>
                      <button
                        onClick={() => deleteHandler(book._id)}
                        className="btn btn-premium-danger btn-sm px-3 py-1"
                        disabled={deleteLoading}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminBookListPage;
