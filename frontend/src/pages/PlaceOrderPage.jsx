import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';

const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    clearCart,
  } = useContext(CartContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const placeOrderHandler = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.post('/api/orders', {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });

      clearCart();
      setLoading(false);
      navigate(`/orders/${data._id}`);
    } catch (err) {
      setLoading(false);
      setError(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
    }
  };

  return (
    <div className="container py-5 animate-fade-in">
      <CheckoutSteps step1 step2 step3 step4 />

      <div className="row g-5">
        {/* Order Details Column */}
        <div className="col-lg-8">
          <div className="d-flex flex-column gap-4">
            {/* Shipping Info */}
            <div className="glass-panel p-4">
              <h4 className="fw-bold mb-3"><i className="bi bi-geo-alt text-primary me-2"></i>Shipping</h4>
              <p className="text-secondary mb-0">
                <strong className="text-white">Address: </strong>
                {shippingAddress.address}, {shippingAddress.city},{' '}
                {shippingAddress.postalCode}, {shippingAddress.country}
              </p>
            </div>

            {/* Payment Info */}
            <div className="glass-panel p-4">
              <h4 className="fw-bold mb-3"><i className="bi bi-credit-card text-primary me-2"></i>Payment Method</h4>
              <p className="text-secondary mb-0">
                <strong className="text-white">Method: </strong>
                {paymentMethod}
              </p>
            </div>

            {/* Items Info */}
            <div className="glass-panel p-4">
              <h4 className="fw-bold mb-4"><i className="bi bi-box-seam text-primary me-2"></i>Order Items</h4>
              {cartItems.length === 0 ? (
                <Message variant="info">Your cart is empty</Message>
              ) : (
                <div className="d-flex flex-column gap-3">
                  {cartItems.map((item, index) => (
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
              )}
            </div>
          </div>
        </div>

        {/* Pricing Summary Column */}
        <div className="col-lg-4">
          <div className="glass-panel p-4">
            <h4 className="fw-bold mb-4 border-bottom border-secondary pb-3">Order Summary</h4>
            
            <div className="d-flex justify-content-between mb-2">
              <span className="text-secondary">Items:</span>
              <span className="text-white">${itemsPrice.toFixed(2)}</span>
            </div>

            <div className="d-flex justify-content-between mb-2">
              <span className="text-secondary">Shipping:</span>
              <span className="text-white">${shippingPrice.toFixed(2)}</span>
            </div>

            <div className="d-flex justify-content-between mb-3 border-bottom border-secondary pb-3">
              <span className="text-secondary">Tax (15%):</span>
              <span className="text-white">${taxPrice.toFixed(2)}</span>
            </div>

            <div className="d-flex justify-content-between mb-4">
              <span className="text-secondary fw-bold">Total:</span>
              <span className="text-warning fw-bold fs-4">${totalPrice.toFixed(2)}</span>
            </div>

            {error && <Message variant="danger">{error}</Message>}

            <button
              onClick={placeOrderHandler}
              className="btn btn-premium-primary w-100 py-3"
              disabled={cartItems.length === 0 || loading}
            >
              {loading ? 'Processing Order...' : 'Place Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderPage;
