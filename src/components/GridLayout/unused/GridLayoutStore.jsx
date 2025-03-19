import React, { useEffect, Suspense, useState} from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { useSelector, useDispatch } from "react-redux";
import { setLayout, fetchLayout, saveLayoutToServer, deleteItemLayout, setContainerStyle } from "../../../redux/layoutSlice.js";
import { Button, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import OpenWithRoundedIcon from '@mui/icons-material/OpenWithRounded';
//import SelfieComponent from "../Camera/SelfieCamera.jsx"
import componentMap from "../ComponentMap.js"

const MyGrid = ({ layoutId , cols = 12, rowHeight = 50, width= 1000, height=720, containerStyle = {} }) => {
  const dispatch = useDispatch();
  const gridItems = useSelector((state) => state.grid.gridItems);
  const layout = useSelector((state) => state.grid.layout);
  const containerS = useSelector((state) => state.grid.containerStyle);

  //const [layoutId, setLayoutId] = useState(); 
  
  useEffect(() => {
    console.log("TEST ID", {layoutId})
    //setLayoutId(_layoutId);
  }, 
  []);


  const handleLayoutChange = (newLayout) => {
    console.log("newLayout ricevuto:", newLayout);
    
    const updatedLayout = newLayout.map(layoutItem => {

      console.log("Layout arrivato:", layoutItem);

      // Trova l'elemento corrispondente in gridItems
      const existingItem = gridItems.find(item => item.i === layoutItem.i);
      
      // Mantieni tutte le proprietà esistenti ma aggiorna posizione e dimensioni
      return {
        ...existingItem,              // Mantiene componentType, style e altre proprietà esistenti
        ...layoutItem,                // Aggiorna x, y, w, h e altre proprietà del layout
      };
    });
  
    console.log("Layout aggiornato:", updatedLayout);
    dispatch(setLayout(updatedLayout));
  };


  const handleDelete = (i) => {
    if (window.confirm("Sei sicuro di voler eliminare questo elemento?")) {
      dispatch(deleteItemLayout(i));
    }
  };

    // Funzione per aggiornare lo stile dinamicamente
    /*
    const updateContainerStyle = (containerStyle) => {
      dispatch(setContainerStyle(containerStyle));
    };
    */
    useEffect(() => {
      //dispatch(setContainerStyle(containerStyle));
      console.log("CONTAINER STYLE useEffect", containerS)
    }, 
    [dispatch, containerS ]); //containerStyle


  // Carica il layout dal server all'avvio
  useEffect(() => {
    console.log("useffectLAyoutID", containerS)
    dispatch(fetchLayout(layoutId));
  }, [dispatch]);
  

  return (
    <Box>
    <Button onClick={() => dispatch(saveLayoutToServer())} variant="contained" color="primary" sx={{margin: 5}}>
      Salva Layout su Server
    </Button>
    <div >
    {/* Bottone per salvare il layout */}

    <GridLayout style={{ ...containerStyle }}
      isBounded={false}       // <-- Mantiene gli item dentro il contenitore // faceva confusione
      preventCollision={true}
      className="layout"
      layout={layout} //????? cambiare gestione e mettere nello stesso oggetto gridItems come figlio o come tabella a parte
      cols={cols}
      rowHeight={rowHeight}
      width={width}
      height={height}
      maxHeight={height} // to pass parameter
      maxWidth={width}
      isDraggable={true}
      isResizable={true}
      verticalCompact={false}
      horizontalCompact={false}
      onLayoutChange={handleLayoutChange}
      //draggableHandle=".drag-handle" // Solo l'elemento con questa classe sarà trascinabile
      >
      {gridItems?.map(({ i, x, y, w, h, componentType, style }) => {
        //console.info("📦 IN:", { i, componentType, componentMap });
        const Component = componentMap[componentType];
        if (!Component) {
          console.error(`❌ Componente non trovato per il tipo: ${componentType}`);
        }
        return (
          <div
          key={i}
          data-grid={{ x, y, w, h, i }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "5px",
            padding: "0px",
            //fontSize: "16px",
            position: "relative",
            backgroundColor: "rgba(255, 255, 255)",
            ...style,
          }}
          >
              <Suspense fallback={<div>Caricamento...</div>}>
                {Component ? <Component /> : <div>Componente non trovato</div>}
              </Suspense>
                {/* trascino e cancello */}
                <Box style={{ 
                  position:"absolute",
                  top: 0,
                  left: 0,
                  backgroundColor: "rgba(0,0,0,0.2)"
                }}>
                  <OpenWithRoundedIcon className="drag-handle" 
                    style={{ 
                      color:"white",
                      margin:"5",
                      cursor: "grab", 
                      backgroundColor: "rgba(0,0,0,0.2)",
                      borderRadius: "5",
                      padding: "2px",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                    }}>
                  </OpenWithRoundedIcon>
                  <DeleteIcon
                    onClick={() => handleDelete(i)}//dispatch(deleteItemLayout(i))}
                    style={{
                      margin:"5",
                      cursor: "pointer",
                      backgroundColor: "rgba(0,0,0,0.2)",
                      color:"red",
                      borderRadius: "5",
                      padding: "2px",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                    }}
                    />
                </Box>
            </div>
          );
        })}
      </GridLayout>
    </div>
  </Box>
  );
};

export default MyGrid;
