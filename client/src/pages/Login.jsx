import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../features/auth/authActions';
import { RouteName } from '../utils/routesConstants';
import { toast, ToastContainer } from 'react-toastify';
import { validateEmail } from '../utils/validations';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(RouteName.dashboard);
    }
  }, [isAuthenticated]);


  const handleLogin = async () => {

    if(!email || !password){
      toast.error('Please fill in all fields.', { position: "top-right" });
      return;
    }

    if(!validateEmail(email)){
      toast.error("Please enter valid email", { position: "top-right" });
      return;
    }

    const resultAction = dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(resultAction)) {
      toast.success('Login Successful!', {
        position: 'bottom-right',
        autoClose: 3000,
      });
    } else if (loginUser.rejected.match(resultAction)) {
      toast.error('Login Failed', {
        position: 'bottom-right',
        autoClose: 3000,
      });
    }
  };

  if(error != null){
    toast.error(error,{
      position: 'bottom-center',
      autoClose: 3000,
    })
  }

  return (

    <div className="relative h-screen bg-white overflow-hidden w-full">
      
      <div
        className="absolute bottom-0 w-full h-48  bg-black rounded-[100px] "
        style={{
          height: "65%",
          transform: "translateY(50%)",
        }}
      >
        
      
        <div className="flex flex-col items-center mt-5 text-white">
          <div className="w-full max-w-sm">
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
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors disabled:bg-gray-400"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
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

export default Login;
