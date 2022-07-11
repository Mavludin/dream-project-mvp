import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UsersData } from '../../modules/auth/models';

export type UserDataState = {
  studentData?: UsersData;
};
type SelectStudentData = {
  userDataReducer: { studentData?: UsersData };
};

const initialState: UserDataState = {
  studentData: JSON.parse(localStorage.getItem('studentData')!),
};

export const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setStudentData: (state, action: PayloadAction<UsersData>) => {
      state.studentData = action.payload;
      localStorage.setItem('studentData', JSON.stringify(action.payload));
    },
  },
});

export const { setStudentData } = userDataSlice.actions;

export const selectStudentData = (state: SelectStudentData) =>
  state.userDataReducer.studentData;

export default userDataSlice.reducer;
