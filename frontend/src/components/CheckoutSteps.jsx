import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className="d-flex justify-content-center mb-5 animate-fade-in">
      <div className="d-flex align-items-center justify-content-between w-100 col-lg-8" style={{ maxWidth: '600px' }}>
        {/* Step 1 */}
        <div className="text-center position-relative flex-grow-1">
          {step1 ? (
            <Link to="/login" className="text-warning text-decoration-none fw-bold small">
              <div className="rounded-circle bg-warning text-dark mx-auto d-flex align-items-center justify-content-center mb-2" style={{ width: '35px', height: '35px' }}>
                <i className="bi bi-person-check-fill"></i>
              </div>
              Sign In
            </Link>
          ) : (
            <div className="text-secondary small">
              <div className="rounded-circle bg-secondary text-dark mx-auto d-flex align-items-center justify-content-center mb-2" style={{ width: '35px', height: '35px', opacity: 0.5 }}>
                <i className="bi bi-person-fill"></i>
              </div>
              Sign In
            </div>
          )}
        </div>

        <div className="flex-grow-1 border-top border-secondary mx-2 mb-4" style={{ opacity: 0.5 }}></div>

        {/* Step 2 */}
        <div className="text-center position-relative flex-grow-1">
          {step2 ? (
            <Link to="/shipping" className="text-warning text-decoration-none fw-bold small">
              <div className="rounded-circle bg-warning text-dark mx-auto d-flex align-items-center justify-content-center mb-2" style={{ width: '35px', height: '35px' }}>
                <i className="bi bi-truck"></i>
              </div>
              Shipping
            </Link>
          ) : (
            <div className="text-secondary small">
              <div className="rounded-circle bg-secondary text-dark mx-auto d-flex align-items-center justify-content-center mb-2" style={{ width: '35px', height: '35px', opacity: 0.5 }}>
                <i className="bi bi-truck"></i>
              </div>
              Shipping
            </div>
          )}
        </div>

        <div className="flex-grow-1 border-top border-secondary mx-2 mb-4" style={{ opacity: 0.5 }}></div>

        {/* Step 3 */}
        <div className="text-center position-relative flex-grow-1">
          {step3 ? (
            <Link to="/payment" className="text-warning text-decoration-none fw-bold small">
              <div className="rounded-circle bg-warning text-dark mx-auto d-flex align-items-center justify-content-center mb-2" style={{ width: '35px', height: '35px' }}>
                <i className="bi bi-credit-card-fill"></i>
              </div>
              Payment
            </Link>
          ) : (
            <div className="text-secondary small">
              <div className="rounded-circle bg-secondary text-dark mx-auto d-flex align-items-center justify-content-center mb-2" style={{ width: '35px', height: '35px', opacity: 0.5 }}>
                <i className="bi bi-credit-card"></i>
              </div>
              Payment
            </div>
          )}
        </div>

        <div className="flex-grow-1 border-top border-secondary mx-2 mb-4" style={{ opacity: 0.5 }}></div>

        {/* Step 4 */}
        <div className="text-center position-relative flex-grow-1">
          {step4 ? (
            <Link to="/placeorder" className="text-warning text-decoration-none fw-bold small">
              <div className="rounded-circle bg-warning text-dark mx-auto d-flex align-items-center justify-content-center mb-2" style={{ width: '35px', height: '35px' }}>
                <i className="bi bi-check-circle-fill"></i>
              </div>
              Place Order
            </Link>
          ) : (
            <div className="text-secondary small">
              <div className="rounded-circle bg-secondary text-dark mx-auto d-flex align-items-center justify-content-center mb-2" style={{ width: '35px', height: '35px', opacity: 0.5 }}>
                <i className="bi bi-check-circle"></i>
              </div>
              Place Order
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutSteps;
