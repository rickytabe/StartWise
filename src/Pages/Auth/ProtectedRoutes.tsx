import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingScreen from '../../Components/shared/LoadingScreen';

interface ProtectedRouteProps {
  requiredRole?: 'learner' | 'mentor' | 'company';
  redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  requiredRole,
  redirectPath = '/login'
}) => {
  const { user, learnerProfile, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  // Role-based protection
  if (requiredRole) {
    let hasRequiredRole = false;

    switch (requiredRole) {
      case 'learner':
        hasRequiredRole = !!learnerProfile;
        break;
      case 'mentor':
        //hasRequiredRole = !!mentorProfile;
        break;
      case 'company':
        // Add company profile check when implemented
        hasRequiredRole = false;
        break;
      default:
        hasRequiredRole = false;
    }

    if (!hasRequiredRole) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
  );
};

export default ProtectedRoute;