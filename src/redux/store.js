// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import deviceReducer from './deviceSlice';
import photoReducer from './photoSlice';
import settingsReducer from './settingsSlice'
import layoutReducer from "./layoutSlice"; // Importa lo slice della griglia


const store = configureStore({
  reducer: {
    device: deviceReducer,
    photos: photoReducer,
    settings: settingsReducer,
    grid: layoutReducer,
  },
});

export default store;
