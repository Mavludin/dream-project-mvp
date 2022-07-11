import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AuthState = {
  isLoggedIn: boolean;
};
type SelectIsLoggedIn = { authReducer: { isLoggedIn: boolean } };

const initialState: AuthState = {
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
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
  },
});

export const { logIn, logOut } = authSlice.actions;

export const selectIsLoggedIn = (state: SelectIsLoggedIn) =>
  state.authReducer.isLoggedIn;

export default authSlice.reducer;
