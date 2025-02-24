// src/redux/deviceSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  deviceRegistered: false,
  deviceToken: null,
};

const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    registerDevice: (state, action) => {
      state.deviceRegistered = true;
      state.deviceToken = action.payload;
    },
    unregisterDevice: (state) => {
      state.deviceRegistered = false;
      state.deviceToken = null;
    },
  },
});

export const { registerDevice, unregisterDevice } = deviceSlice.actions;
export default deviceSlice.reducer;
