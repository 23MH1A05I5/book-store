import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Message from '../components/Message';

const AdminBookEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const [countInStock, setCountInStock] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await axios.get(`/api/books/${id}`);
        setTitle(data.title);
        setPrice(data.price);
        setImage(data.image);
        setAuthor(data.author);
        setGenre(data.genre);
        setDescription(data.description);
        setCountInStock(data.countInStock);
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

    fetchBook();
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    setUpdateError(null);
    try {
      await axios.put(`/api/books/${id}`, {
        title,
        price: Number(price),
        image,
        author,
        genre,
        description,
        countInStock: Number(countInStock),
      });
      setUpdateLoading(false);
      navigate('/admin/booklist');
    } catch (err) {
      setUpdateLoading(false);
      setUpdateError(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
    }
  };

  return (
    <div className="container py-5 animate-fade-in">
      <Link className="btn btn-premium-primary mb-4" to="/admin/booklist">
        <i className="bi bi-arrow-left me-1"></i>Back to Inventory List
      </Link>

      <div className="d-flex justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <div className="glass-panel p-5">
            <h2 className="fw-bold mb-4">Edit Book</h2>

            {updateError && <Message variant="danger">{updateError}</Message>}
            {error && <Message variant="danger">{error}</Message>}

            {loading ? (
              <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <form onSubmit={submitHandler}>
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label className="form-label text-secondary small fw-bold">TITLE</label>
                    <input
                      type="text"
                      placeholder="Enter title"
                      className="form-control form-control-premium"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label text-secondary small fw-bold">AUTHOR</label>
                    <input
                      type="text"
                      placeholder="Enter author"
                      className="form-control form-control-premium"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="row g-3 mb-3">
                  <div className="col-md-4">
                    <label className="form-label text-secondary small fw-bold">PRICE ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="Enter price"
                      className="form-control form-control-premium"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label text-secondary small fw-bold">GENRE</label>
                    <input
                      type="text"
                      placeholder="Enter genre"
                      className="form-control form-control-premium"
                      value={genre}
                      onChange={(e) => setGenre(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label text-secondary small fw-bold">COUNT IN STOCK</label>
                    <input
                      type="number"
                      placeholder="Enter stock count"
                      className="form-control form-control-premium"
                      value={countInStock}
                      onChange={(e) => setCountInStock(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label text-secondary small fw-bold">IMAGE URL</label>
                  <input
                    type="text"
                    placeholder="Enter image url (e.g. /images/clean_code.jpg)"
                    className="form-control form-control-premium"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label text-secondary small fw-bold">DESCRIPTION</label>
                  <textarea
                    rows="5"
                    placeholder="Enter description"
                    className="form-control form-control-premium"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn-premium-primary w-100 py-3"
                  disabled={updateLoading}
                >
                  {updateLoading ? 'Saving Changes...' : 'Save Book'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBookEditPage;
