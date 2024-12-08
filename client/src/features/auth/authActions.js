import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
  
  // Async thunk for login
  export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }, { rejectWithValue }) => {
      try {
        const response = await axios.post('http://localhost:3000/api/auth/login', { email, password });
        return response.data; // Assuming API returns user and token
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
      return response.data; // Assuming API returns user details
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to load user');
    }
  });
  
  