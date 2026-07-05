import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

/**
 * RouteGuard – wraps protected routes.
 * @param {boolean} adminOnly – if true, also requires isAdmin
 * @param {ReactNode} children
 */
const RouteGuard = ({ children, adminOnly = false }) => {
  const { userInfo } = useContext(AuthContext);

  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !userInfo.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RouteGuard;
