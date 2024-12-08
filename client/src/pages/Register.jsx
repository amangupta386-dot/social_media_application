import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../features/auth/authActions';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleRegister = async () => {
    const resultAction = await dispatch(registerUser({ name, email, password }));
    if (registerUser.fulfilled.match(resultAction)) {
      navigate('/login');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister} disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Register;
