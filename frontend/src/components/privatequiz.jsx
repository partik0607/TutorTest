
// components/ProtectedRoute.jsx
import { useLocation, Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token=localStorage.getItem('auth-token');
  const isAuthenticated = token;
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/test-login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
