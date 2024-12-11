import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../components/fireabase';
import { toast } from "react-toastify";
import { API_ENDPOINTS } from "../../utils/apiEndPoints";


export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async ({ name, email, password }, { rejectWithValue }) => {
      try {
        const response = await axios.post(API_ENDPOINTS.REGISTER, { name, email, password });
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
        const response = await axios.post(API_ENDPOINTS.LOGIN, { email, password });
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
      const response = await axios.get(API_ENDPOINTS.PROTECTED, {
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
          console.log(API_ENDPOINTS.GOOGLE_SIGN_IN, "GOOGLE_SIGN_IN");
          const response = await axios.post(API_ENDPOINTS.GOOGLE_SIGN_IN, {
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
  
  