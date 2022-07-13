import { configureStore } from '@reduxjs/toolkit';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import authReducer from './slices/auth';
import userDataReducer from './slices/userData';
import lessonsReducer, {
  STATE_KEY as LESSONS_STATE_KEY,
} from './slices/lessons';
import { emptyGraphqlApi } from './api/emptyGraphqlApi';

export const store = configureStore({
  reducer: {
    authReducer,
    userDataReducer,
    [LESSONS_STATE_KEY]: lessonsReducer,
    [emptyGraphqlApi.reducerPath]: emptyGraphqlApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(emptyGraphqlApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
