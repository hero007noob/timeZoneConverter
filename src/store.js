import { configureStore } from '@reduxjs/toolkit'; 
import timezoneSlice from './components/timezoneSlice';

export const store = configureStore({
  reducer: {
    timezone: timezoneSlice,
  },
});
