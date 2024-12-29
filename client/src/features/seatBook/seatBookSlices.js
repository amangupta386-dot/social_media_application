import { createSlice } from '@reduxjs/toolkit';
import { seatBook, bookedSeatReset } from '../seatBook/seatBookActions'; // Adjust the import path
import { getSeats } from './seatBookActions';

const initialState = {
  bookedSeats: [],
  loading: false,
  resetLoader:false,
  error: null,
  success: false,
};

const seatSlice = createSlice({
  name: 'seat',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle getSeats actions
      .addCase(getSeats.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getSeats.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.seats = action.payload; // Assuming API response contains seats data

      })
      .addCase(getSeats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

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
        state.resetLoader = true;
        state.error = null;
      })
      .addCase(bookedSeatReset.fulfilled, (state) => {
        state.resetLoader = false;
        state.success = true;
        state.bookedSeats = [];
      })
      .addCase(bookedSeatReset.rejected, (state, action) => {
        state.resetLoader = false;
        state.error = action.payload;
      });
  },
});

export default seatSlice.reducer;
