import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, requireAdmin = false }) => {
    const token = localStorage.getItem('token');
    const isAdmin = localStorage.getItem('isAdmin') === 'true';

    // ❌ Not logged in
    if (!token) {
        return <Navigate to="/login" />;
    }

    // ❌ Not admin but admin route
    if (requireAdmin && !isAdmin) {
        return <Navigate to="/learn" />;
    }

    // ✅ Access granted
    return children;
};

export default PrivateRoute;
