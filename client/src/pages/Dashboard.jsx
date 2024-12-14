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
      <div className="flex items-center space-x-4">
        <div className="h-12 w-12 rounded-full overflow-hidden">
          <img src="images/profileImage.png" alt="Profile" className="h-full w-full object-cover" />
        </div>
        <div>
          <div className="text-sm font-medium text-gray-400">Welcome Back</div>
          <div className="text-lg font-semibold text-black">Sakshi Agarwal</div>
        </div>
      </div>
      <div className="text-2xl font-bold space-y-4 text-black"> Feeds</div>

      <div className="w-72 h-72 border bg-pink-100 rounded-2xl">
      <div className="h-12 w-12 rounded-full overflow-hidden">
          <img src="images/profileImage.png" alt="Profile" className="h-full w-full object-cover" />
        </div>
      </div>

      <button onClick={handleLogout}>Logout</button>
    </>
  );
}

export default Dashboard;
