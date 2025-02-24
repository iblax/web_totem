// src/redux/photoSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  photos: [],
};

const photoSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    setPhotos: (state, action) => {
      state.photos = action.payload;
    },
    addPhoto: (state, action) => {
      state.photos.push(action.payload);
    },
  },
});

export const { setPhotos, addPhoto } = photoSlice.actions;
export default photoSlice.reducer;
