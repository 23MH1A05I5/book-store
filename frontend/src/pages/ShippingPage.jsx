import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingPage = () => {
  const { shippingAddress, saveShippingAddress } = useContext(CartContext);
  const navigate = useNavigate();

  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
  const [country, setCountry] = useState(shippingAddress.country || '');

  const submitHandler = (e) => {
    e.preventDefault();
    saveShippingAddress({ address, city, postalCode, country });
    navigate('/payment');
  };

  return (
    <div className="container py-5">
      <CheckoutSteps step1 step2 />

      <div className="d-flex justify-content-center">
        <div className="col-12 col-md-8 col-lg-6 animate-fade-in">
          <div className="glass-panel p-5">
            <h2 className="fw-bold mb-4">Shipping Address</h2>

            <form onSubmit={submitHandler}>
              <div className="mb-3">
                <label className="form-label text-secondary small fw-bold">ADDRESS</label>
                <input
                  type="text"
                  placeholder="Enter address"
                  className="form-control form-control-premium"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-secondary small fw-bold">CITY</label>
                <input
                  type="text"
                  placeholder="Enter city"
                  className="form-control form-control-premium"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-secondary small fw-bold">POSTAL CODE</label>
                <input
                  type="text"
                  placeholder="Enter postal code"
                  className="form-control form-control-premium"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label text-secondary small fw-bold">COUNTRY</label>
                <input
                  type="text"
                  placeholder="Enter country"
                  className="form-control form-control-premium"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-premium-primary w-100">
                Continue to Payment
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPage;
