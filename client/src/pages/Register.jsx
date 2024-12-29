import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../features/auth/authActions';
import { useNavigate } from 'react-router-dom';
import { RouteName } from '../utils/routesConstants';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validateEmail } from '../utils/validations';


const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state?.auth);

  const handleRegister = async () => {
    if(!email || !password || !name){
      toast.error('Please fill in all fields.', { position: "top-right" });
      return;
    }

    if(!validateEmail(email)){
      toast.error('Please enter valid email', { position: "top-right" });
      return;
    }

    const resultAction = await dispatch(registerUser({ name, email, password }));
    if (registerUser.fulfilled.match(resultAction)) {
      toast.success('User Register Successfully', {
        position: 'bottom-right',
        autoClose: 3000,
      });
      navigate(RouteName.login);    
    } else if (registerUser.rejected.match(resultAction)) {
      toast.error('Register Failed.', {
        position: 'bottom-right',
        autoClose: 3000,
      });
    }
  };


  return (
    <div className="relative h-screen bg-white overflow-hidden w-full">
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
            onChange={(e) => setName(e?.target?.value)}
            className="w-full p-2 mb-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e?.target?.value)}
            className="w-full p-2 mb-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e?.target?.value)}
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
        <div className="mt-2">
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
        <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
      </div>
    </div>
  </div>
  );
};

export default Register;
