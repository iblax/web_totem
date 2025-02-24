// src/redux/settingsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  autoplay: true, // Se la galleria riproduce le immagini automaticamente
  displayMode: "grid", // Modalità di visualizzazione: "grid" o "carousel"
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleAutoplay: (state) => {
      state.autoplay = !state.autoplay;
    },
    setDisplayMode: (state, action) => {
      state.displayMode = action.payload;
    },
  },
});

export const { toggleAutoplay, setDisplayMode } = settingsSlice.actions;
export default settingsSlice.reducer;
