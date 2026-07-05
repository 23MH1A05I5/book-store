import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import Message from '../components/Message';

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4">Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <div className="glass-panel p-5 text-center">
          <i className="bi bi-cart-x text-secondary display-1 mb-3"></i>
          <h4 className="fw-semibold">Your Cart is Empty</h4>
          <p className="text-secondary mb-4">Go explore our rich collections of books.</p>
          <Link className="btn btn-premium-primary" to="/">
            Browse Catalog
          </Link>
        </div>
      ) : (
        <div className="row g-4 animate-fade-in">
          {/* Cart Items List */}
          <div className="col-lg-8">
            <div className="d-flex flex-column gap-3">
              {cartItems.map((item) => (
                <div key={item.book} className="glass-panel p-3 d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
                  {/* Book Image */}
                  <div style={{ width: '80px', height: '110px', display: 'flex', justifyContent: 'center', background: '#131b2e', borderRadius: '8px', overflow: 'hidden', padding: '5px' }}>
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                    />
                  </div>

                  {/* Book Title */}
                  <div className="flex-grow-1 text-center text-md-start">
                    <Link to={`/books/${item.book}`} className="text-decoration-none">
                      <h6 className="text-white fw-bold mb-1 text-truncate" style={{ maxWidth: '300px' }}>
                        {item.title}
                      </h6>
                    </Link>
                  </div>

                  {/* Book Price */}
                  <div className="fw-bold text-warning fs-5">
                    ${item.price.toFixed(2)}
                  </div>

                  {/* Quantity Selector */}
                  <div>
                    <select
                      className="form-select form-control-premium py-1 px-2"
                      style={{ width: '80px', fontSize: '0.9rem' }}
                      value={item.qty}
                      onChange={(e) => addToCart(item, Number(e.target.value))}
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Remove Button */}
                  <div>
                    <button
                      onClick={() => removeFromCart(item.book)}
                      className="btn btn-premium-danger py-2 px-3"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Subtotal Checkout Summary Card */}
          <div className="col-lg-4">
            <div className="glass-panel p-4">
              <h4 className="fw-bold mb-3 border-bottom border-secondary pb-3">Subtotal</h4>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-secondary">Total Books:</span>
                <span className="fw-bold text-white">{totalItems}</span>
              </div>
              <div className="d-flex justify-content-between mb-4">
                <span className="text-secondary">Estimated Price:</span>
                <span className="fw-bold text-warning fs-4">${totalPrice}</span>
              </div>
              <button
                onClick={checkoutHandler}
                className="btn btn-premium-primary w-100"
              >
                <i className="bi bi-credit-card-2-front me-2"></i>Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
