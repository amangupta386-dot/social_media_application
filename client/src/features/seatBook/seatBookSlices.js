import { createSlice } from '@reduxjs/toolkit';
import { seatBook, bookedSeatReset } from './path-to-your-thunks'; // Adjust the import path

const initialState = {
  bookedSeats: [],
  loading: false,
  error: null,
  success: false,
};

const seatSlice = createSlice({
  name: 'seat',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle seatBook actions
      .addCase(seatBook.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(seatBook.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.bookedSeats = action.payload; // Assuming API response contains booked seats data
      })
      .addCase(seatBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      
      // Handle bookedSeatReset actions
      .addCase(bookedSeatReset.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bookedSeatReset.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.bookedSeats = [];
      })
      .addCase(bookedSeatReset.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default seatSlice.reducer;
