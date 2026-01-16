import { Outlet, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/Auth';
// import Sidebar from './Sidebar';
// import Topbar from './Topbar';

export default function DashboardLayout() {
  const { isAuthenticated: isLoggedIn, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      navigate('/login');
    }
  }, [loading, isLoggedIn]);

  return (
    <Box display="flex" minHeight="100vh">
      {/* <Sidebar /> */}
      <Box flex={1}>
        {/* <Topbar /> */}
        <Outlet />
      </Box>
    </Box>
  );
}
