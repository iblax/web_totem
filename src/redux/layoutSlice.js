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
  try {
    const response = await fetch(`${API_URL}/`);

    console.log("GET RESPONSE", response);

    if (!response.ok) {
      throw new Error(`Errore HTTP! Status: ${response.status}`);
    }

    let data = await response.json();
    
    // Controlla se data è nullo o un array vuoto
    if (!data || (Array.isArray(data) && data.length === 0)) {
      console.log("Nessun layout trovato, uso quello di default.");
      return [defaultLayout]; // Ritorna un array contenente il layout di default
    }

    console.info("LAYOUTS FETCH:", data);
    return data; // Restituisce i dati ricevuti dall'API
  } catch (error) {
    console.error("Errore durante il fetch dei layout:", error);
    return [defaultLayout]; // Fallback in caso di errore
  }
});


export const defaultLayout = {
  _id: "000",
  gridItems: [
    { i: "1", x: 0, y: 0, w: 4, h: 4, componentType: "selfie", style: { background: "lightblue" } },
    { i: "2", x: 4, y: 5, w: 4, h: 4, componentType: "custom1", style: { background: "lightgreen" } },
    { i: "3", x: 5, y: 0, w: 4, h: 4, componentType: "custom2", style: { background: "lightcoral" } },
    ],
    containerStyle: {
      //width: 1280, // Larghezza 100% della finestra
      //maxWidth: 1280, // Larghezza 100% della finestra
      //height: 720, // Altezza 100% della finestra
      //maxHeight: 720, // Altezza 100% della finestra
      background: "#f5f5f5", // Colore di sfondo
      padding: "0px",
      backgroundImage: "url('https://fastly.picsum.photos/id/9/910/540.jpg?hmac=Vz54u6JKGiyedcEBM5hlZ0iL5okuPdVwzoKfTe_CE30')", // Sostituisci con il percorso dell'immagine
      backgroundSize: "cover", // Copre l'intero GridLayout
      backgroundPosition: "center",
      backgroundColor: "#E9E9E9", // Se vuoi anche un colore di sfondo
      borderRadius: "10px", // Bordo arrotondato opzionale
      overflow: "hidden", // Evita il resize fuori dall'area
    },
    container:{
      width: 720,
      height: 1280, // Altezza 100% della finestra
    },
    name: "Default"
}



// Thunk per salvare il layout
export const saveLayoutToServer = createAsyncThunk("grid/saveLayout", async (_, { getState }) => {
  const state = getState().grid;
  console.log("Slice Layout to save: ", state.currentLayout)

if(state.selectedLayout != null && state.selectedLayout._id !== "000"){
  const response = await fetch(API_URL + "/save/" + state.selectedLayout._id, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(state.currentLayout),
  });
  console.info(" save res: ", response);
  return response.ok;
}
else{
  const response = await fetch(API_URL + "/save", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(state.currentLayout),
  });
  console.info(" save res: ", response);
  return response.ok;
}
  
  
});

export const deleteItemLayout = createAsyncThunk("grid/removeItemLayout", async(elementId) => {
  console.log("Async Thunk Remove Item: " + elementId)
  return elementId;
}

 )



export const initialState = {
  layouts: [],
  selectedLayout: null,
  currentLayout: {},
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
    setContainerStyle: (state, action) => {
      console.log("setContainerStyle", action.payload);
      state.containerStyle = action.payload;
    },
    //Usata per definire il layout corrente
    setSelectedLayout: (state, action) => {
      console.log("SelectedLayout", action.payload);
      state.selectedLayout = action.payload;
    },
    setNewLayout: (state, action) => {
      state.currentLayout = action.payload;
      console.log("setNewLayout", state.currentLayout)
    }
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchLayout.fulfilled, (state, action) => {
        state.gridItems = action.payload?.gridItems;
        state.containerStyle = action.payload?.layout;
        state.container = action.payload?.container;
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

export const { setNewLayout, setGridItems, setLayout, addItem, removeItem, setContainerStyle, setSelectedLayout } = layoutSlice.actions;
export default layoutSlice.reducer;

/* reducer
, 
    setLayout: (state, action) => {
      const newLayout = action.payload?.map(newItem => {
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
    */

/*
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
  */

    
    
