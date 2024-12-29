import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINTS } from "../../utils/apiEndPoints";


export const seatBook = createAsyncThunk(
    'seat/bookedSeats',
    async ({ bookedSeats }, { rejectWithValue }) => {
      try {
        const response = await axios.post(API_ENDPOINTS.SEAT_BOOK, { bookedSeats });
        return response?.data;
      } catch (error) {
      
        return rejectWithValue(error?.response?.data?.error || 'Something went wrong');
      }
    }
  );
  
  export const bookedSeatReset = createAsyncThunk(
    'seat/bookedSeatReset',
    async ({}, { rejectWithValue }) => {
      try { 
        const response = await axios.post(API_ENDPOINTS.BOOKED_SEAT_RESET);
        return response.data; 
      } catch (error) {
        
        return rejectWithValue(error?.response?.data?.error || 'Something went wrong');
      }
    }
  );


  
  