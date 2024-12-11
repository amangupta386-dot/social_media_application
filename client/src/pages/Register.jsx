import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../features/auth/authActions';
import { useNavigate } from 'react-router-dom';
import AuthenticationPageGrid from '../components/AuthenticationPageGrid';
import { RouteName } from '../utils/routesConstants';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleRegister = async () => {
    const resultAction = await dispatch(registerUser({ name, email, password }));
    debugger
    if (registerUser.fulfilled.match(resultAction)) {
      navigate(RouteName.login);
    }
  };


  return (
    <div className="relative h-screen bg-white overflow-hidden w-full">
      <AuthenticationPageGrid/>
    <div
      className="absolute bottom-0 w-full bg-black rounded-t-[100px] p-8"
      style={{
        height: "65%",
        transform: "translateY(50%)",
      }}
    >
      <div className="flex flex-col items-center text-white">
        <div className="w-full max-w-sm">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 mb-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
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
            onClick={handleRegister}
            disabled={loading}
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors disabled:bg-gray-400"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
        <div className="mt-4">
          <p className="text-sm">
            Already have an account?{' '}
            <span
              onClick={() => navigate(RouteName.login)}
              className="text-blue-400 hover:underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Register;
