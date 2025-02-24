import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "http://127.0.0.1:3003/api/layouts";

// Thunk per caricare il layout
export const fetchLayout = createAsyncThunk("grid/fetchLayout", async (layoutId) => {
  const response = await fetch(`${API_URL}/${layoutId}`);
  const data = await response.json();
  console.info("DATA FETCH:" + layoutId , data)
  return data;
});

export const fetchLayouts = createAsyncThunk("grid/fetchLayouts", async () => {
  const response = await fetch(`${API_URL}/`);
  const data = await response.json();
  console.info("LAYOUTS FETCH:"  , data)
  return data;
});

// Thunk per salvare il layout
export const saveLayoutToServer = createAsyncThunk("grid/saveLayout", async (_, { getState }) => {
  const state = getState().grid;
  
  const layoutData = {
    gridItems: state.gridItems.map(({ i, x, y, w, h, componentType, style }) => ({
      i, x, y, w, h, componentType, style
    })),
    layout: state.layout || []  // Includi `layout` se serve
  };

  console.log("Layout to save: ", layoutData)

  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(layoutData),
  });

  console.info(" save res: ", response);

  return response.ok;
});

export const deleteItemLayout = createAsyncThunk("grid/removeItemLayout", async(elementId) => {
  console.log("Async Thunk Remove Item: " + elementId)
  return elementId;
}

 )

export const initialState = {
  
  layouts: [],
  selectedLayout: null,
  gridItems: [
    /*
    { i: "1", x: 0, y: 0, w: 4, h: 4, componentType: "selfie", style: { background: "lightblue" } },
    { i: "2", x: 4, y: 5, w: 4, h: 4, componentType: "custom1", style: { background: "lightgreen" } },
    { i: "3", x: 5, y: 0, w: 4, h: 4, componentType: "custom2", style: { background: "lightcoral" } },
     */
    ],
    containerStyle: {},
    status: "idle",
};

// Slice Redux
const layoutSlice = createSlice({
  name: "grid",
  initialState,
  reducers: {
    setGridItems: (state, action) => {
      state.gridItems = action.payload;
    },
    setLayout: (state, action) => {
      const newLayout = action.payload.map(newItem => {
        const existingItem = state.gridItems.find(item => item.i === newItem.i);
        return {
          ...newItem,
          componentType: existingItem ? existingItem.componentType : newItem.componentType,
          style: existingItem ? existingItem.style : newItem.style
        };
      });
      state.gridItems = newLayout;
      state.layout = state.containerStyle;
    },
    addItem: (state, action) => {
      state.gridItems.push(action.payload);
    },
    removeItem: async (state, action) => {
      state.gridItems = state.gridItems.filter((item) => item.i !== action.payload);
    },
    setContainerStyle: (state, action) => {
      console.log("setContainerStyle", action.payload);
      state.containerStyle = action.payload;
    },
    setSelectedLayout: (state, action) => {
      console.log("SelectedLayout", action.payload);
      state.selectedLayout = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLayout.fulfilled, (state, action) => {
        state.gridItems = action.payload?.gridItems;
        state.containerStyle = action.payload?.layout;
        console.log("fetchLayouts:", action.payload);
      })
      .addCase(saveLayoutToServer.fulfilled, () => {
        console.log("Layout salvato con successo");
      })
      .addCase(deleteItemLayout.fulfilled, (state, action) => {
        state.gridItems = state.gridItems.filter(item => item.i !== action.payload);
        console.log("Elemento rimosso:", action.payload);
      })
      .addCase(fetchLayouts.fulfilled, (state, action) => {
        state.layouts = action.payload;
        console.log("fetchLayouts:", action.payload);
        
      });
  },
});

export const { setGridItems, setLayout, addItem, removeItem, setContainerStyle, setSelectedLayout } = layoutSlice.actions;
export default layoutSlice.reducer;
