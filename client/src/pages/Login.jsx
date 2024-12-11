import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../features/auth/authActions';
import SignInWithGoogle from '../components/SignInWithGoogle';
import AuthenticationPageGrid from '../components/AuthenticationPageGrid';
import { RouteName } from '../utils/routesConstants';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate(); const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(RouteName.dashboard);
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async () => {
    const resultAction = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(resultAction)) {
      navigate(RouteName.dashboard);
    }
  };

  return (

    <div className="relative h-screen bg-white overflow-hidden w-full">
      <AuthenticationPageGrid />
      <div
        className="absolute bottom-0 w-full h-48  bg-black rounded-[100px] "
        style={{
          height: "65%",
          transform: "translateY(50%)",
        }}
      >
        <SignInWithGoogle />
        <div className="flex flex-col items-center mt-5 text-white">
          <div className="w-full max-w-sm">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mb-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mb-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors disabled:bg-gray-400"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
          <div className="mt-4">
            <p className="text-sm">
              Don't have an account?{' '}
              <span
                onClick={() => navigate(RouteName.register)}
                className="text-blue-400 hover:underline cursor-pointer"
              >
                Register here
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Login;
