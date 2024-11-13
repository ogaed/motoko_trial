import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  console.log('ProtectedRoute - User state:', user);

  if (!user.isAuthenticated) {
    console.log('User not authenticated, redirecting to login');
    return <Navigate to="/login" />;
  }

  console.log('User authenticated, rendering protected content');
  return children;
};

export default ProtectedRoute; 