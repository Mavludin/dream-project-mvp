import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { LessonItem } from '../../models';
import { lessonsGraphqlApi } from '../api/lessonsApi';

export const STATE_KEY = 'lessons';

export type PodcastState = {
  lessonsCollection: LessonItem[];
};

export const initialState: PodcastState = {
  lessonsCollection: [],
};

export const lessonsSlice = createSlice({
  name: STATE_KEY,
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addMatcher(
      lessonsGraphqlApi.endpoints.fetchLessons.matchFulfilled,
      (state, { payload }) => {
        state.lessonsCollection = payload.items;
      },
    );
  },
});

export const selectLessons = (state: RootState): LessonItem[] =>
  state[STATE_KEY].lessonsCollection;

const lessonsReducer = lessonsSlice.reducer;

export default lessonsReducer;
