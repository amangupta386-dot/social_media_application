import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../features/auth/authActions';
import SignInWithGoogle from '../components/SignInWithGoogle';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  const images = [
    "/images/image1.png",
    "/images/image2.png",
    "/images/image4.png",
    "/images/image5.png",
    "/images/image8.png",
    "/images/image3.png",
    "/images/image6.png",
    "/images/image7.png",
    "/images/image8.png",
    "/images/image9.png"
  ];

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async () => {
    const resultAction = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(resultAction)) {
      navigate('/dashboard');
    }
  };

  return (

    <div className="relative h-screen bg-white overflow-hidden w-full">

      <div className="grid grid-cols-3 gap-2 p-2">
        {images.map((image, index) => (
          <div
            key={index}
            className={`relative overflow-hidden 
                ${index % 2 === 0 ? "row-span-3" : ""
              } ${index === 4 ? "h-72" : "h-full"
              }`} // Apply a reduced height for images 5 and 6
          >
            <img
              src={image}
              alt={`Image ${index + 1}`}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        ))}
      </div>


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
                onClick={() => navigate('/register')}
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
