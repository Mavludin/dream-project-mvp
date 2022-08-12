import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { LessonItem } from '../../models';
import { lessonsGraphqlApi } from '../api/lessonsApi';

export const STATE_KEY = 'lessons';

export type PodcastState = {
  lessonsCollection: LessonItem[];
  openLessonsIds: string[];
  status: 'idle' | 'loading' | 'failed' | 'success';
};

export const initialState: PodcastState = {
  lessonsCollection: [],
  openLessonsIds: [],
  status: 'idle',
};

export const fetchOpenLessons = createAsyncThunk(
  'lessons/fetchOpenLessons',
  async () => {
    try {
      const res = await fetch('/api/open-lessons');

      if (res.ok) {
        const { data } = await res.json();
        return data;
      }
      return new Error('Ошибка получения открытых материалов');
    } catch (err) {
      return new Error(
        'Ошибка получения открытых материалов (API хост некорректен)',
      );
    }
  },
);

export const deleteOpenLesson = createAsyncThunk(
  'lessons/deleteOpenLesson',
  async (id: string) => {
    try {
      const res = await fetch(`/api/open-lessons/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        return id;
      }
      return new Error('Ошибка');
    } catch (error) {
      return new Error('Ошибка');
    }
  },
);

export const createOpenLesson = createAsyncThunk(
  'lessons/createOpenLesson',
  async (id: string) => {
    try {
      const res = await fetch('/api/open-lessons', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lessonId: id }),
      });

      if (res.ok) {
        return await res.json();
      }
      return new Error('Ошибка');
    } catch (error) {
      return new Error('Ошибка');
    }
  },
);

export const lessonsSlice = createSlice({
  name: STATE_KEY,
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build
      .addCase(fetchOpenLessons.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchOpenLessons.fulfilled, (state, action) => {
        state.openLessonsIds = action.payload;
        state.status = 'success';
      })
      .addCase(fetchOpenLessons.rejected, (state, action) => {
        state.status = 'failed';
      })
      .addCase(deleteOpenLesson.fulfilled, (state, action) => {
        state.openLessonsIds = state.openLessonsIds.filter(
          (id: string) => id !== action.payload,
        );
        state.status = 'success';
      })
      .addCase(deleteOpenLesson.rejected, (state, action) => {
        state.status = 'failed';
      })
      .addCase(createOpenLesson.fulfilled, (state, action) => {
        state.openLessonsIds.push(action.payload);
      })
      .addCase(createOpenLesson.rejected, (state, action) => {
        state.status = 'failed';
      })
      .addMatcher(
        lessonsGraphqlApi.endpoints.fetchLessons.matchFulfilled,
        (state, { payload }) => {
          state.lessonsCollection = payload.items;
        },
      );
  },
});

export const selectLessons = (state: RootState): LessonItem[] =>
  state[STATE_KEY].lessonsCollection;
export const selectOpenLessonsIds = (state: RootState): string[] =>
  state[STATE_KEY].openLessonsIds;

const lessonsReducer = lessonsSlice.reducer;

export default lessonsReducer;
