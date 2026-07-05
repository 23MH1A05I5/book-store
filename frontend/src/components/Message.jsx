import React from 'react';

const Message = ({ variant = 'info', children }) => {
  return (
    <div className={`alert alert-${variant} glass-panel border-0 text-white animate-fade-in mb-3`} role="alert">
      {children}
    </div>
  );
};

export default Message;
