import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserTypes } from '../../modules/auth/models';

export type AuthState = {
  isLoggedIn: boolean;
  userType: UserTypes;
};
type SelectIsLoggedIn = { authReducer: { isLoggedIn: boolean } };
type SelectUserType = { authReducer: { userType: UserTypes } };

type PayloadType = {
  isRemembered: boolean;
  userRadioType: UserTypes;
};

const initialState: AuthState = {
  // TODO: refactor
  isLoggedIn:
    localStorage.getItem('isLoggedIn') === 'true' ||
    sessionStorage.getItem('isLoggedIn') === 'true',
  userType:
    (localStorage.getItem('userType') as UserTypes) ||
    (sessionStorage.getItem('userType') as UserTypes) ||
    'student',
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
        localStorage.setItem('userType', action.payload.userRadioType);
      }

      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('userType', action.payload.userRadioType);
    },
    logOut: (state) => {
      state.isLoggedIn = false;
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userType');
      sessionStorage.removeItem('isLoggedIn');
      sessionStorage.removeItem('userType');
    },
  },
});

export const { logIn, logOut } = authSlice.actions;

export const selectIsLoggedIn = (state: SelectIsLoggedIn) =>
  state.authReducer.isLoggedIn;
export const selectUserType = (state: SelectUserType) =>
  state.authReducer.userType;

export default authSlice.reducer;
