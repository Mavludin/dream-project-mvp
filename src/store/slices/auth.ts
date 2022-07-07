import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AuthState = {
  isLoggedIn: boolean;
  currentUserId: number;
};
type SelectIsLoggedIn = { authReducer: { isLoggedIn: boolean } };
type SelectCurrentUserId = { authReducer: { currentUserId: number } };

const initialState: AuthState = {
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
  currentUserId: Number(localStorage.getItem('currentUserId')) || 0,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = true;

      if (action.payload) {
        localStorage.setItem('isLoggedIn', 'true');
      }
    },
    logOut: (state) => {
      state.isLoggedIn = false;
      localStorage.removeItem('isLoggedIn');
    },
    setCurrentUserId: (state, action: PayloadAction<number>) => {
      state.currentUserId = action.payload;
      localStorage.setItem('currentUserId', String(action.payload));
    },
  },
});

export const { logIn, logOut, setCurrentUserId } = authSlice.actions;

export const selectIsLoggedIn = (state: SelectIsLoggedIn) =>
  state.authReducer.isLoggedIn;

export const selectCurrentUserId = (state: SelectCurrentUserId) =>
  state.authReducer.currentUserId;

export default authSlice.reducer;
