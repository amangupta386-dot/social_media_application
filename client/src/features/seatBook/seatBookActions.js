import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINTS } from "../../utils/apiEndPoints";


export const seatBook = createAsyncThunk(
    'seat/bookedSeats',
    async ({ bookedSeats }, { rejectWithValue }) => {
     
      const token = localStorage.getItem('token');
    if (!token) return rejectWithValue('No token found');
      try { 
        const response = await axios.post(API_ENDPOINTS.SEAT_BOOK, {bookedSeats}, {
          headers: { Authorization: `Bearer ${token}` }
        });
        return response?.data;
      } catch (error) {
        return rejectWithValue(error?.response?.data?.error || 'Something went wrong');
      }
    }
  );
  
  export const bookedSeatReset = createAsyncThunk(
    'seat/bookedSeatReset',
    async (_, { rejectWithValue }) => {
      const token = localStorage.getItem('token');
    if (!token) return rejectWithValue('No token found');
      try { 
        const response = await axios.post(API_ENDPOINTS.BOOKED_SEAT_RESET, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        return response.data; 
      } catch (error) {
        
        return rejectWithValue(error?.response?.data?.error || 'Something went wrong');
      }
    }
  );


  
  