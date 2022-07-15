import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AuthState = {
  isLoggedIn: boolean;
  userType: 'student' | 'teacher';
};
type SelectIsLoggedIn = { authReducer: { isLoggedIn: boolean } };
type SelectUserType = { authReducer: { userType: 'student' | 'teacher' } };

type PayloadType = {
  isRemembered: boolean;
  userRadioType: 'student' | 'teacher';
};

const initialState: AuthState = {
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
  userType: 'student',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<PayloadType>) => {
      state.isLoggedIn = true;
      state.userType = action.payload.userRadioType;

      if (action.payload.isRemembered) {
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
export const selectUserType = (state: SelectUserType) =>
  state.authReducer.userType;

export default authSlice.reducer;
