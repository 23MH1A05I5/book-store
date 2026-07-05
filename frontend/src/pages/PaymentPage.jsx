import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentPage = () => {
  const { shippingAddress, savePaymentMethod, paymentMethod } = useContext(CartContext);
  const navigate = useNavigate();

  // If shipping address doesn't exist, redirect to shipping page
  if (!shippingAddress.address) {
    navigate('/shipping');
  }

  const [paymentMethodSelected, setPaymentMethodSelected] = useState(paymentMethod || 'PayPal');

  const submitHandler = (e) => {
    e.preventDefault();
    savePaymentMethod(paymentMethodSelected);
    navigate('/placeorder');
  };

  return (
    <div className="container py-5">
      <CheckoutSteps step1 step2 step3 />

      <div className="d-flex justify-content-center">
        <div className="col-12 col-md-8 col-lg-5 animate-fade-in">
          <div className="glass-panel p-5">
            <h2 className="fw-bold mb-4">Payment Method</h2>

            <form onSubmit={submitHandler}>
              <div className="mb-4">
                <label className="form-label text-secondary small fw-bold mb-3">SELECT METHOD</label>
                
                <div className="form-check mb-3">
                  <input
                    type="radio"
                    className="form-check-input"
                    id="PayPal"
                    name="paymentMethod"
                    value="PayPal"
                    checked={paymentMethodSelected === 'PayPal'}
                    onChange={(e) => setPaymentMethodSelected(e.target.value)}
                  />
                  <label className="form-check-label text-white" htmlFor="PayPal">
                    PayPal or Credit Card
                  </label>
                </div>

                <div className="form-check mb-3">
                  <input
                    type="radio"
                    className="form-check-input"
                    id="Stripe"
                    name="paymentMethod"
                    value="Stripe"
                    checked={paymentMethodSelected === 'Stripe'}
                    onChange={(e) => setPaymentMethodSelected(e.target.value)}
                  />
                  <label className="form-check-label text-white" htmlFor="Stripe">
                    Stripe (Instant Checkout)
                  </label>
                </div>
              </div>

              <button type="submit" className="btn btn-premium-primary w-100">
                Continue to Place Order
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
