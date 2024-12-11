import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';
import { RouteName } from '../utils/routesConstants';

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate(RouteName.login);
  };

  return (
    <>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}

export default Dashboard;
