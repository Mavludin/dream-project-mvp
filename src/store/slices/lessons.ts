import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { LessonItem } from '../../models';
import { lessonsGraphqlApi } from '../api/lessonsApi';

export const STATE_KEY = 'lessons';

export type PodcastState = {
  lessonsCollection: LessonItem[];
  openLessonsIds: string[];
  readLessonsIds: string[];
  status: 'idle' | 'loading' | 'failed' | 'success';
};

export const initialState: PodcastState = {
  lessonsCollection: [],
  openLessonsIds: [],
  readLessonsIds: [],
  status: 'idle',
};

export const fetchOpenLessonsIds = createAsyncThunk(
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

export const fetchReadLessonsIds = createAsyncThunk(
  'lessons/fetchReadLessonsIds',
  async () => {
    try {
      const res = await fetch('/api/read-lessons');

      if (res.ok) {
        const { data } = await res.json();
        return data;
      }
      return new Error('Ошибка получения прочитанных материалов');
    } catch (error) {
      return new Error(
        'Ошибка получения прочитанных материалов (API хост некорректен)',
      );
    }
  },
);

export const deleteOpenLessonId = createAsyncThunk(
  'lessons/deleteOpenLesson',
  async (id: string) => {
    try {
      const res = await fetch(`/api/open-lessons/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        return id;
      }
      return new Error('Ошибка при удалении открытых материалов');
    } catch (error) {
      return new Error(
        'Ошибка при удалении открытых материалов (API хост некорректен)',
      );
    }
  },
);

export const createOpenLessonId = createAsyncThunk(
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
      return new Error('Ошибка при добавлении открытых материалов');
    } catch (error) {
      return new Error(
        'Ошибка при добавлении открытых материалов (API хост некорректен)',
      );
    }
  },
);

export const lessonsSlice = createSlice({
  name: STATE_KEY,
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build
      .addCase(fetchOpenLessonsIds.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOpenLessonsIds.fulfilled, (state, action) => {
        state.openLessonsIds = action.payload;
        state.status = 'success';
      })
      .addCase(fetchOpenLessonsIds.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(fetchReadLessonsIds.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchReadLessonsIds.fulfilled, (state, action) => {
        state.readLessonsIds = action.payload;
        state.status = 'success';
      })
      .addCase(fetchReadLessonsIds.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(deleteOpenLessonId.fulfilled, (state, action) => {
        state.openLessonsIds = state.openLessonsIds.filter(
          (id: string) => id !== action.payload,
        );
        state.status = 'success';
      })
      .addCase(deleteOpenLessonId.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(createOpenLessonId.fulfilled, (state, action) => {
        state.openLessonsIds.push(action.payload);
      })
      .addCase(createOpenLessonId.rejected, (state) => {
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
export const selectReadLessonsIds = (state: RootState): string[] =>
  state[STATE_KEY].readLessonsIds;

const lessonsReducer = lessonsSlice.reducer;

export default lessonsReducer;
