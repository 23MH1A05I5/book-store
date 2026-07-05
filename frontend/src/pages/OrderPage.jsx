import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Message from '../components/Message';
import { AuthContext } from '../context/AuthContext';

const OrderPage = () => {
  const { id } = useParams();
  const { userInfo } = useContext(AuthContext);

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pay/Deliver status triggers
  const [payLoading, setPayLoading] = useState(false);
  const [deliverLoading, setDeliverLoading] = useState(false);

  const fetchOrderDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(`/api/orders/${id}`);
      setOrder(data);
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
    fetchOrderDetails();
  }, [id]);

  const payOrderHandler = async () => {
    setPayLoading(true);
    try {
      await axios.put(`/api/orders/${id}/pay`);
      await fetchOrderDetails();
      setPayLoading(false);
    } catch (err) {
      setPayLoading(false);
      alert(err.response && err.response.data.message ? err.response.data.message : err.message);
    }
  };

  const deliverOrderHandler = async () => {
    setDeliverLoading(true);
    try {
      await axios.put(`/api/orders/${id}/deliver`);
      await fetchOrderDetails();
      setDeliverLoading(false);
    } catch (err) {
      setDeliverLoading(false);
      alert(err.response && err.response.data.message ? err.response.data.message : err.message);
    }
  };

  return loading ? (
    <div className="container py-5 d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
      <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  ) : error ? (
    <div className="container py-5">
      <Message variant="danger">{error}</Message>
    </div>
  ) : (
    <div className="container py-5 animate-fade-in">
      <h2 className="fw-bold mb-5">Order Reference: #{order._id}</h2>

      <div className="row g-5">
        {/* Main Details */}
        <div className="col-lg-8">
          <div className="d-flex flex-column gap-4">
            {/* Customer Details */}
            <div className="glass-panel p-4">
              <h4 className="fw-bold mb-3"><i className="bi bi-person text-primary me-2"></i>Customer</h4>
              <p className="text-secondary mb-1">
                <strong className="text-white">Name: </strong> {order.user.name}
              </p>
              <p className="text-secondary mb-0">
                <strong className="text-white">Email: </strong>{' '}
                <a href={`mailto:${order.user.email}`} className="text-warning text-decoration-none">
                  {order.user.email}
                </a>
              </p>
            </div>

            {/* Shipping Details */}
            <div className="glass-panel p-4">
              <h4 className="fw-bold mb-3"><i className="bi bi-geo-alt text-primary me-2"></i>Shipping Details</h4>
              <p className="text-secondary mb-3">
                <strong className="text-white">Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                {order.shippingAddress.postalCode}, {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <div className="alert bg-success-subtle text-success border-0 rounded-3 mb-0 py-2">
                  <i className="bi bi-patch-check-fill me-2"></i>Delivered on{' '}
                  {new Date(order.deliveredAt).toLocaleString()}
                </div>
              ) : (
                <div className="alert bg-danger-subtle text-danger border-0 rounded-3 mb-0 py-2">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>Not Delivered
                </div>
              )}
            </div>

            {/* Payment Status */}
            <div className="glass-panel p-4">
              <h4 className="fw-bold mb-3"><i className="bi bi-credit-card text-primary me-2"></i>Payment Status</h4>
              <p className="text-secondary mb-3">
                <strong className="text-white">Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <div className="alert bg-success-subtle text-success border-0 rounded-3 mb-0 py-2">
                  <i className="bi bi-patch-check-fill me-2"></i>Paid on{' '}
                  {new Date(order.paidAt).toLocaleString()}
                </div>
              ) : (
                <div className="alert bg-danger-subtle text-danger border-0 rounded-3 mb-0 py-2">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>Awaiting Payment
                </div>
              )}
            </div>

            {/* Items */}
            <div className="glass-panel p-4">
              <h4 className="fw-bold mb-4"><i className="bi bi-box-seam text-primary me-2"></i>Order Items</h4>
              <div className="d-flex flex-column gap-3">
                {order.orderItems.map((item, index) => (
                  <div key={index} className="d-flex align-items-center justify-content-between border-bottom border-secondary pb-3">
                    <div className="d-flex align-items-center gap-3">
                      <div style={{ width: '45px', height: '60px', display: 'flex', justifyContent: 'center', background: '#131b2e', borderRadius: '6px', overflow: 'hidden', padding: '2px' }}>
                        <img
                          src={item.image}
                          alt={item.title}
                          style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                        />
                      </div>
                      <Link to={`/books/${item.book}`} className="text-decoration-none text-white fw-bold small text-truncate" style={{ maxWidth: '250px' }}>
                        {item.title}
                      </Link>
                    </div>

                    <div className="small text-secondary">
                      {item.qty} x ${item.price.toFixed(2)} ={' '}
                      <strong className="text-warning">${(item.qty * item.price).toFixed(2)}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Summary */}
        <div className="col-lg-4">
          <div className="d-flex flex-column gap-4">
            <div className="glass-panel p-4">
              <h4 className="fw-bold mb-4 border-bottom border-secondary pb-3">Pricing Breakdown</h4>
              
              <div className="d-flex justify-content-between mb-2">
                <span className="text-secondary">Subtotal:</span>
                <span className="text-white">${order.itemsPrice.toFixed(2)}</span>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span className="text-secondary">Shipping:</span>
                <span className="text-white">${order.shippingPrice.toFixed(2)}</span>
              </div>

              <div className="d-flex justify-content-between mb-3 border-bottom border-secondary pb-3">
                <span className="text-secondary">Tax (15%):</span>
                <span className="text-white">${order.taxPrice.toFixed(2)}</span>
              </div>

              <div className="d-flex justify-content-between mb-4">
                <span className="text-secondary fw-bold">Total Cost:</span>
                <span className="text-warning fw-bold fs-4">${order.totalPrice.toFixed(2)}</span>
              </div>

              {/* Simulation Payment Trigger */}
              {!order.isPaid && (
                <button
                  onClick={payOrderHandler}
                  className="btn btn-premium-primary w-100 mb-2 py-3"
                  disabled={payLoading}
                >
                  {payLoading ? 'Processing Payment...' : 'Pay Order (Simulated)'}
                </button>
              )}

              {/* Admin Delivery Trigger */}
              {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <button
                  onClick={deliverOrderHandler}
                  className="btn btn-premium-secondary w-100 py-3"
                  disabled={deliverLoading}
                >
                  {deliverLoading ? 'Processing Delivery...' : 'Mark As Delivered'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
