import { configureStore } from '@reduxjs/toolkit';
import authenReducer from '../features/authen/authenSlice';
import goalReducer from '../features/goals/goalSlice';

export const store = configureStore({
  reducer: {
    authen: authenReducer,
    goals: goalReducer,
  },
});
