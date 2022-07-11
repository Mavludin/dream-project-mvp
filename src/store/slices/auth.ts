import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UsersData } from '../../modules/auth/models';

export type AuthState = {
  isLoggedIn: boolean;
  studentData?: UsersData;
};
type SelectIsLoggedIn = { authReducer: { isLoggedIn: boolean } };
type SelectStudentData = {
  authReducer: { studentData?: UsersData };
};

const initialState: AuthState = {
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
  studentData: JSON.parse(localStorage.getItem('studentData')!),
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
    setStudentData: (state, action: PayloadAction<UsersData>) => {
      state.studentData = action.payload;
      localStorage.setItem('studentData', JSON.stringify(action.payload));
    },
  },
});

export const { logIn, logOut, setStudentData } = authSlice.actions;

export const selectIsLoggedIn = (state: SelectIsLoggedIn) =>
  state.authReducer.isLoggedIn;

export const selectStudentData = (state: SelectStudentData) =>
  state.authReducer.studentData;

export default authSlice.reducer;
