import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/auth/authSlice'
import seatReducer from './features/seatBook/seatBookSlices'

export const store = configureStore({
    reducer:{
        auth:authReducer,
        seat:seatReducer
    }
})