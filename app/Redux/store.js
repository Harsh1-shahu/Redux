import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      counter: counterReducer,
    },
  });
};

