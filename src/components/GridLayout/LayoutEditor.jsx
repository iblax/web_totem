import {useState, useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchLayouts, setSelectedLayout } from "../../redux/layoutSlice.js";
import Select, { SelectChangeEvent } from '@mui/material/Select';

import GridLayout from './GridLayoutStore.jsx'
import ContainerSettings from './ContainerSettings.jsx'

import {Box, Button, OutlinedInput, MenuItem, InputLabel, FormControl} from '@mui/material'

const LayoutEditor = () => {

  const [openDialog, setOpenDialog] = useState(false)
  // Stili per il container principale della griglia
  const [containerWith, setContainerWith] = useState(1280);
  const [containerHeight, setContainerHeight] = useState(720);
  const [ containerStyle, setContainerStyle] = useState({
    width: containerWith, // Larghezza 100% della finestra
    maxWidth: containerWith, // Larghezza 100% della finestra
    height: containerHeight, // Altezza 100% della finestra
    maxHeight: containerHeight, // Altezza 100% della finestra
    background: "#f5f5f5", // Colore di sfondo
    padding: "0px",
    backgroundImage: "url('https://fastly.picsum.photos/id/9/910/540.jpg?hmac=Vz54u6JKGiyedcEBM5hlZ0iL5okuPdVwzoKfTe_CE30')", // Sostituisci con il percorso dell'immagine
    backgroundSize: "cover", // Copre l'intero GridLayout
    backgroundPosition: "center",
    backgroundColor: "#E9E9E9", // Se vuoi anche un colore di sfondo
    borderRadius: "10px", // Bordo arrotondato opzionale
    overflow: "hidden", // Evita il resize fuori dall'area
  });

  const dispatch = useDispatch();
  const layouts = useSelector((state) => state.grid.layouts);
  const selectedLayout = useSelector((state) => state.grid.selectedLayout);

  const [myLayouts, setMyLayouts] = useState();

  
  useEffect(() => {
    dispatch(fetchLayouts());
    //setMyLayouts(layouts);
    console.log("LAYOUTS", myLayouts);    
  }, 
  [dispatch]);
  
  const createNewLayout = () => {
    console.log("Crea nuovo Layout -- ToDO!!");
  }


    return(
        <Box>
            <Button variant="contained" onClick={() => createNewLayout()}>
                Crea Nuovo Layout
            </Button>

            <Button variant="contained" onClick={() => setOpenDialog(true)}>
                Modifica Stile Container
            </Button>
            
            {/* <InputLabel shrink htmlFor="select-multiple-native">Layouts</InputLabel> */}
            <InputLabel shrink htmlFor="select-multiple-native">Layouts</InputLabel>
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

            <ContainerSettings
                open={openDialog}
                containerStyle={containerStyle}
                setContainerStyle={setContainerStyle}
                onClose={() => setOpenDialog(false)}
            />
            
            {selectedLayout && (
            <GridLayout style={{ margin:10}} layoutId={selectedLayout?._id}  items={null} cols={50} rowHeight={5} width={1280} height={720} containerStyle={containerStyle}/>
            )}
            </Box>
    );
}

export default LayoutEditor;