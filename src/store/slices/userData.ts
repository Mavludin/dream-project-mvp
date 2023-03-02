import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserDataState = {
  userId?: number;
};
type SelectUserId = {
  userDataReducer: { userId?: number };
};

const initialState: UserDataState = {
  userId: JSON.parse(localStorage.getItem('userId')!),
};

export const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<number>) => {
      state.userId = action.payload;
      localStorage.setItem('userId', JSON.stringify(action.payload));
    },
  },
});

export const { setUserId } = userDataSlice.actions;

export const selectUserId = (state: SelectUserId) =>
  state.userDataReducer.userId;

export default userDataSlice.reducer;
