import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../features/auth/authActions';
import SignInWithGoogle from '../components/SignInWithGoogle';
import AuthenticationPageGrid from '../components/AuthenticationPageGrid';
import { RouteName } from '../utils/routesConstants';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { clearError, setError } from '../features/auth/authSlice';
import { validateEmail } from '../utils/validations';


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

    if(!email || !password){
      dispatch(setError('Please fill in all fields.'));
      setTimeout(()=>{
        dispatch(clearError());
      }, 2000)
      return;
    }
    if(!validateEmail(email)){
      dispatch(setError('Please enter valid email'));
      setTimeout(()=>{
        dispatch(clearError());
      }, 2000)
      return;
    }

    const resultAction = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(resultAction)) {
      toast.success('Login Successful!', {
        position: 'top-center',
        autoClose: 3000,
      });
    } else if (loginUser.rejected.match(resultAction)) {
      toast.error('Login Failed', {
        position: 'top-center',
        autoClose: 3000,
      });
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
          <ToastContainer
            position="top-left"
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

export default Login;
