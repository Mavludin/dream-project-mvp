import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserDataState = {
  studentId?: number;
};
type SelectstudentId = {
  userDataReducer: { studentId?: number };
};

const initialState: UserDataState = {
  studentId: JSON.parse(localStorage.getItem('studentId')!),
};

export const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setStudentId: (state, action: PayloadAction<number>) => {
      state.studentId = action.payload;
      localStorage.setItem('studentId', JSON.stringify(action.payload));
    },
  },
});

export const { setStudentId } = userDataSlice.actions;

export const selectStudentId = (state: SelectstudentId) =>
  state.userDataReducer.studentId;

export default userDataSlice.reducer;
