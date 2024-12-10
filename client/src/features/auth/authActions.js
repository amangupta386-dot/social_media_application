import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../components/fireabase';
import { toast } from "react-toastify";


export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async ({ name, email, password }, { rejectWithValue }) => {
      try {
        const response = await axios.post('http://localhost:3000/api/auth/register', { name, email, password });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || 'Something went wrong');
      }
    }
  );
  
  export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }, { rejectWithValue }) => {
      try {
        const response = await axios.post('http://localhost:3000/api/auth/login', { email, password });
        return response.data; 
      } catch (error) {
        return rejectWithValue(error.response?.data || 'Something went wrong');
      }
    }
  );

  export const loadUser = createAsyncThunk('auth/loadUser', async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    if (!token) return rejectWithValue('No token found');
    
    try {
      const response = await axios.get('http://localhost:3000/api/auth/protected', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to load user');
    }
  });
  
  export const googleSignIn = createAsyncThunk(
    'auth/googleSignIn',
    async (_, { rejectWithValue}) => {
      try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
  
        if (result.user) {
          const user = {
            name: result.user.displayName,
            email: result.user.email,
            googleId: result.user.uid, 
            token: result.user.accessToken,
            photoURL:result.user.photoURL
          };
          
          const response = await axios.post('http://localhost:3000/api/auth/google-login', {
            email: user.email,
            googleId: user.googleId,
            name: user.name,
            profilePic:user.photoURL
          });
  
          if (response.data) {
            
            return response.data; 
          }
  
          throw new Error('Google Sign-In failed');
        }
  
        throw new Error('Google Sign-In failed');
      } catch (error) {
        return rejectWithValue(error.message || 'Google Sign-In failed');
      }
    }
  );
  
  