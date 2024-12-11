import { createSlice } from '@reduxjs/toolkit';
import { googleSignIn, loadUser, loginUser, registerUser } from './authActions';


const initialState = { isAuthenticated: false, user: null, loading: false, error: "", token: null, };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = typeof action.payload === 'string' ? action.payload : 'An error occurred';    
    },
    clearError: (state) => {
      state.error = null; 
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    debugger
    builder
      .addCase(registerUser.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        })
      .addCase(registerUser.fulfilled,
        (state, action) => {
          state.loading = false;
          state.isAuthenticated = false;
          state.user = action?.payload;
        })
      .addCase(registerUser.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action?.payload;
        });

    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        debugger
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action?.payload?.token;
        state.user = action?.payload?.user || null;
        localStorage.setItem('token', action?.payload?.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

      builder
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loadUser.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        localStorage.removeItem('token');
      });

      builder
      .addCase(googleSignIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleSignIn.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(googleSignIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setError, clearError } = authSlice.actions;
export default authSlice.reducer;
