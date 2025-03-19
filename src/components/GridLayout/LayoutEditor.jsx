import {useState, useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchLayouts, setSelectedLayout, defaultLayout } from "../../redux/layoutSlice.js";
import Select from '@mui/material/Select';
import MyLayout from './LayoutDrawer.jsx'
import { setNewLayout, saveLayoutToServer} from "../../redux/layoutSlice.js";

import ContainerSettings from './ContainerSettings.jsx'
import ComponentDialog from './ComponentDialog.jsx'

import {Box, Button, OutlinedInput, MenuItem, InputLabel} from '@mui/material'

const LayoutEditor = () => {

  const [openDialog, setOpenDialog] = useState(false);
  const [openComponentDialog, setOpenComponentDialog] = useState(false);

  const [openDrawer, setOpenDrawer] = useState(false); // Stato per aprire/chiudere il Drawer

  // Stili per il container principale della griglia
  //const [containerWith, setContainerWith] = useState(1280);
  //const [containerHeight, setContainerHeight] = useState(720);
  const [ containerStyle, setContainerStyle] = useState({
    //width: containerWith, // Larghezza 100% della finestra
    //maxWidth: containerWith, // Larghezza 100% della finestra
    //height: containerHeight, // Altezza 100% della finestra
    //maxHeight: containerHeight, // Altezza 100% della finestra
    background: "#f5f5f5", // Colore di sfondo
    padding: "0px",
    backgroundImage: "url('https://fastly.picsum.photos/id/9/910/540.jpg?hmac=Vz54u6JKGiyedcEBM5hlZ0iL5okuPdVwzoKfTe_CE30')", // Sostituisci con il percorso dell'immagine
    backgroundSize: "cover", // Copre l'intero GridLayout
    backgroundPosition: "center",
    backgroundColor: "#E9E9E9", // Se vuoi anche un colore di sfondo
    borderRadius: "10px", // Bordo arrotondato opzionale
    overflow: "hidden", // Evita il resize fuori dall'area
  });

  /*
  useEffect(() => {
    setContainerStyle((prevStyle) => ({
      ...prevStyle,
      width: containerWith,
      maxWidth: containerWith,
      height: containerHeight,
      maxHeight: containerHeight,
    }));
  }, [containerWith, containerHeight]);
*/
  const dispatch = useDispatch();
  const layouts = useSelector((state) => state.grid.layouts);
  const selectedLayout = useSelector((state) => state.grid.selectedLayout);

  const [myLayouts, setMyLayouts] = useState();
  const [newLayoutName, setLayoutName] = useState();

  let layoutDrawerRef = null;

  
  useEffect(() => {
    dispatch(fetchLayouts());
    //setMyLayouts(layouts);
    console.log("LAYOUTS", myLayouts);    
  }, 
  [dispatch]);

  useEffect( () => {
    console.log("LAYOUTS", selectedLayout);  
  }, [selectedLayout])
  
  const configNewLayout = () => {
    console.log("Crea nuovo Layout -- ToDO!!");
    setOpenDialog(true)
  }

  const createNewLAyout = (containerStyle, container, name) => {
    
    const newLayoutCreated = defaultLayout;
    newLayoutCreated.container = container;
    newLayoutCreated.containerStyle = containerStyle;
    newLayoutCreated.name = name
    newLayoutCreated.gridItems = []
    // Funzione che riceve myLayout dal Child e lo salva
    console.info("newLayoutCreated", containerStyle, container, name)
    dispatch(setSelectedLayout(newLayoutCreated));
    console.info("Inviato:", selectedLayout )
    setOpenDialog(false)

  };

  const handleSave = () => {
    if (layoutDrawerRef) {
        layoutDrawerRef.SaveLayout(); // Richiama la funzione del figlio
    }
};

const handleOpenDialog = () => {
    if (layoutDrawerRef) {
        layoutDrawerRef.setOpenDialog(true); // Modifica lo stato del child
    }
};

const handleAddComponent = () => {
  setOpenComponentDialog(true)
}

const addComponent = (compType) => {
  const newLayout = { ...selectedLayout };

  console.info("sel Layout", selectedLayout)
  const i = selectedLayout.gridItems.length + 1;
  console.log("i", i);

  const newComponent = {
    'i': i.toString(), // ID univoco basato sulla lunghezza della lista
    'componentType': compType,
    'x': 0, // Posizionamento iniziale
    'y': 0, // Inserisce sempre in basso
    'w': 5,
    'h': 5,
    style:{
      'background'
      : 
      'lightcoral'
    } 
  };

  newLayout.gridItems = [...newLayout.gridItems, newComponent];

  console.log("New", newLayout)

  dispatch(setSelectedLayout(newLayout)); // Assuming setSelectedLayout is your state update function

}


    return(
        <Box> 
            <Box>
              <Button variant="contained" onClick={() => configNewLayout()}>
                  Crea Nuovo Layout
              </Button>            
              {/*<InputLabel shrink htmlFor="select-multiple-native">Layouts</InputLabel> */}
              <Select
                  label="Layout"
                  sx={{minWidth: '20%', marginLeft: 2}}
                  value={selectedLayout ? selectedLayout._id : ""}
                  onChange={(event) => {
                    dispatch(setSelectedLayout(null));
                    const selectedId = event.target.value;
                    const selectedObj = layouts.find(layout => layout._id === selectedId);
                    dispatch(setSelectedLayout(selectedObj));
                  }}
                  input={<OutlinedInput label="Seleziona un layout"/>}
                  >
                  <MenuItem value="" disabled>Seleziona un layout</MenuItem>
    
                  {layouts.length > 0 ? (
                    layouts?.map((layout) => (
                      <MenuItem key={layout._id} value={layout._id}>
                          {layout.name}
                      </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>Nessun layout disponibile {myLayouts}</MenuItem>
                    )}
              </Select>

              {selectedLayout && ( 
                <Button onClick={handleSave} variant="contained" color="primary" sx={{margin: 5}}>
                            Salva Layout su Server
                </Button>
                )}
                {selectedLayout && ( 

                <Button variant="contained" onClick={handleOpenDialog}>
                  Modifica Stile Container
                </Button>

                
                )}

                {selectedLayout && ( 

                <Button variant="contained" onClick={handleAddComponent} sx={{margin: 5}}>
                  Add Component
                </Button>


                )}
                

            </Box>

            <Box sx={{display:'flex', flexDirection: 'row', paddingLeft: '20px'}}>
            {selectedLayout &&  (           
                <MyLayout 
                isEditor={true}
                  assignedLayout={selectedLayout}  
                  items={null} cols={36} 
                  width={1280} height={720} 
                  ref={(el) => (layoutDrawerRef = el)} // Salva il riferimento al child
                  />
            )}
            </Box>
            
                    {/* 
          Creazione nuovo Layout
        */}
            <ContainerSettings
                isNew={true}
                open={openDialog}
                container={{width: 1280, height: 720}}
                containerStyle={containerStyle}
                setContainerStyle={setContainerStyle}
                setLayoutName={setLayoutName}
                onClose={() => setOpenDialog(false)}
                createNewLayout={createNewLAyout}
                />
              <ComponentDialog open={openComponentDialog}
                onClose={ () => setOpenComponentDialog(false)}
                addComponent={(key) => {
                  console.log("Chiave ricevuta nel genitore:", key); 
                  addComponent(key)
                  // DEBUG
                }}
              />
        </Box>
        
    );
}

export default LayoutEditor;

