import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-auto py-4 border-top border-secondary" style={{ background: '#0b0f19' }}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <span className="text-secondary small">
              &copy; {new Date().getFullYear()} BookStore. All Rights Reserved.
            </span>
          </div>
          <div className="col-md-6 text-center text-md-end mt-2 mt-md-0">
            <span className="text-secondary small">
              Built with <i className="bi bi-heart-fill text-danger mx-1"></i> using the MERN Stack.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
