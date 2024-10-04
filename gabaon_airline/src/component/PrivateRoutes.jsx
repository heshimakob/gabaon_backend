import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoutes = ({ adminOnly }) => {
  const { token, isAdmin } = useSelector((state) => state.users);

  if (!token) return <Navigate to="/login" />;
  if (adminOnly && !isAdmin) return <Navigate to="/" />;
  
  return <Outlet />;
};

export default PrivateRoutes;