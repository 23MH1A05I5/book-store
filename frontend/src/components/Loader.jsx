/**
 * Loader – spinning animation for loading states
 */
const Loader = ({ size = 'md', text = 'Loading...' }) => {
  const sizeMap = { sm: '1.5rem', md: '3rem', lg: '5rem' };
  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-5">
      <div
        className="spinner-border"
        style={{
          width: sizeMap[size],
          height: sizeMap[size],
          color: 'var(--primary-color)',
          borderWidth: '3px',
        }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      {text && (
        <p className="mt-3" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          {text}
        </p>
      )}
    </div>
  );
};

export default Loader;
