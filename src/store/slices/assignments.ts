import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import AppConfig from '../../config/AppConfig';
import { Examples } from '../../models';
import {
  AssignmentsData,
  CompletedAssignment,
} from '../../modules/student/models/index';

export const STATE_KEY = 'assignments';

export type PodcastState = {
  assignmentsData: AssignmentsData[];
  openAssignment: any;
  openAssignmentExamples: Examples[];
  openAssignmentsIds: number[];
  studentStat: undefined;
  completedAssignments: CompletedAssignment[];
  status: 'idle' | 'loading' | 'failed' | 'success';
};
export const initialState: PodcastState = {
  assignmentsData: [],
  openAssignment: [],
  openAssignmentExamples: [],
  openAssignmentsIds: [],
  studentStat: undefined,
  completedAssignments: [],
  status: 'idle',
};

export const fetchAssignments = createAsyncThunk(
  'assignments/fetchAssignments',
  async () => {
    try {
      const res = await fetch(`${AppConfig.apiUrl}/api/assignments`);

      if (res.ok) {
        const { data } = await res.json();
        return data;
      }
      return new Error('Ошибка получения задач');
    } catch (error) {
      return new Error('Ошибка получения задач (API хост некорректен)');
    }
  },
);

export const fetchAssignment = createAsyncThunk(
  'assignments/fetchAssignment',
  async (id: number) => {
    try {
      const res = await fetch(`${AppConfig.apiUrl}/api/assignments/${id}`);

      if (res.ok) {
        const { data } = await res.json();
        return data;
      }
      return new Error('Ошибка получения задачи');
    } catch (error) {
      return new Error('Ошибка получения задачи (API хост некорректен)');
    }
  },
);

export const fetchOpenAssignmentsIds = createAsyncThunk(
  'assignments/fetchOpenAssignmentsIds',
  async () => {
    try {
      const res = await fetch(`${AppConfig.apiUrl}/api/open-assignments`);

      if (res.ok) {
        const { data } = await res.json();
        return data;
      }
      return new Error('Ошибка получения открытых задач');
    } catch (err) {
      return new Error(
        'Ошибка получения открытых задач (API хост некорректен)',
      );
    }
  },
);

export const fetchStudentStat = createAsyncThunk(
  'assignments/fetchStudentStat',
  async (id: number) => {
    try {
      const res = await fetch(`${AppConfig.apiUrl}/api/student-stats/${id}`);

      if (res.ok) {
        const { data } = await res.json();
        return data;
      }
      return new Error('Ошибка получения статистики учащихся');
    } catch (err) {
      return new Error(
        'Ошибка получения статистики учащихся (API хост некорректен)',
      );
    }
  },
);

export const deleteOpenAssignmentsIds = createAsyncThunk(
  'assignments/deleteOpenAssignmentsIds',
  async (id: number) => {
    try {
      const res = await fetch(
        `${AppConfig.apiUrl}/api/open-assignments/${id}`,
        {
          method: 'DELETE',
        },
      );

      if (res.ok) {
        const { data } = await res.json();
        return data;
      }
      return new Error('Ошибка удаления открытых задач');
    } catch (err) {
      return new Error('Ошибка удаления открытых задач (API хост некорректен)');
    }
  },
);

export const createOpenAssignmentsIds = createAsyncThunk(
  'lessons/createOpenAssignments',
  async (id: number) => {
    try {
      const res = await fetch(`${AppConfig.apiUrl}/api/open-assignments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ asgmtId: id }),
      });

      if (res.ok) {
        return await res.json();
      }
      return new Error('Ошибка при добавлении открытых задач');
    } catch (error) {
      return new Error(
        'Ошибка при добавлении открытых задач (API хост некорректен)',
      );
    }
  },
);

export const assignmentsSlice = createSlice({
  name: STATE_KEY,
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build
      .addCase(fetchAssignments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAssignments.fulfilled, (state, action) => {
        state.assignmentsData = action.payload;
        state.status = 'success';
      })
      .addCase(fetchAssignments.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(fetchAssignment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAssignment.fulfilled, (state, action) => {
        state.openAssignment = action.payload;
        state.openAssignmentExamples = action.payload.examples;
        state.status = 'success';
      })
      .addCase(fetchAssignment.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(fetchOpenAssignmentsIds.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOpenAssignmentsIds.fulfilled, (state, action) => {
        state.openAssignmentsIds = action.payload;
        state.status = 'success';
      })
      .addCase(fetchOpenAssignmentsIds.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(fetchStudentStat.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStudentStat.fulfilled, (state, action) => {
        state.studentStat = action.payload;
        state.completedAssignments = action.payload.completedAssignments;
        state.status = 'success';
      })
      .addCase(fetchStudentStat.rejected, (state) => {
        state.status = 'failed';
      })

      .addCase(deleteOpenAssignmentsIds.fulfilled, (state, action) => {
        state.openAssignmentsIds = state.openAssignmentsIds.filter(
          (id: number) => id !== action.payload,
        );
        state.status = 'success';
      })
      .addCase(deleteOpenAssignmentsIds.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(createOpenAssignmentsIds.fulfilled, (state, action) => {
        state.openAssignmentsIds.push(action.payload);
      })
      .addCase(createOpenAssignmentsIds.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectAssignmentsData = (state: RootState) => state[STATE_KEY];

const assignmentsReducer = assignmentsSlice.reducer;
export default assignmentsReducer;
