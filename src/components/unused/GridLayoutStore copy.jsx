import React, { useEffect } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { useSelector, useDispatch } from "react-redux";
import { setGridItems, setLayout, removeItem, saveLayout, loadLayout } from "../../redux/layoutSlice.js";
import AspectRatioRoundedIcon from "@mui/icons-material/AspectRatioRounded";
import { Button } from "@mui/material";
import SelfieComponent from '../Camera/SelfieCamera.jsx'
import DeleteIcon from "@mui/icons-material/Delete"; // 📌 Importa l'icona di cancellazione


const MyGrid = ({ cols = 12, rowHeight = 50, width = 800, containerStyle = {} }) => {
  const dispatch = useDispatch();

  
  const CustomComponent1 = () => <div style={{ padding: "10px" }}>📦 Primo Box</div>;
  const CustomComponent2 = () => <button style={{ }}>🔘 Cliccami</button>;
  const CustomComponent3 = () => <img src="https://picsum.photos/200" alt="Immagine" />;
  
  const componentMap = {
    "1": <SelfieComponent />,
    "2": <CustomComponent1 />,
    "3": <CustomComponent2 />,
    "4": <CustomComponent3 />,
  };
  
  // Otteniamo lo stato globale Redux
  const gridItems = useSelector((state) => state.layout.gridItems);
  const layout = useSelector((state) => state.layout.layout);

  useEffect(() => 
    {
      dispatch(loadLayout()); // Carica il layout salvato all'avvio
    }, [dispatch]);

  return (
    <div style={{ ...containerStyle }}>
        {/*
      <Button onClick={() => dispatch(saveLayout())} variant="contained" color="primary">
        Salva Layout
      </Button>
      */}

      <GridLayout
        className="layout"
        layout={layout}
        cols={cols}
        rowHeight={rowHeight}
        width={width}
        isDraggable={true}
        isResizable={true}
        verticalCompact={false}
        horizontalCompact={false}
        onLayoutChange={(newLayout) => dispatch(setLayout(newLayout))}>
        {gridItems.map(({ i, style }) => (
          <div key={i} style={{ 
            display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                borderRadius: "5px", 
                padding: "0px", 
                fontSize: "16px",
                position: "relative",
                ...style
          }}>
            {/* 📌 Icona per eliminare il componente */}
            {componentMap[i] || "Componente non trovato"} {/* 🔹 Recupera il componente dalla mappa */}
            <DeleteIcon
                      onClick={() =>dispatch(removeItem(i))}
                      style={{
                        position: "absolute",
                        top: "5px",           // Centra verticalmente
                        right: "5px",       // Sposta 30px fuori dal box a destra
                        //transform: "translateY(-50%)",  // Aggiusta il centramento verticale
                        cursor: "pointer",
                        color: "red",
                        backgroundColor: "white",
                        borderRadius: "50%",
                        borderWidth: "4px",
                        padding: "2px",
                        zIndex: 10, // 🔹 Assicura che sia sopra gli altri elementi
                        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",  // Opzionale: aggiunge un'ombra
                      }}
                  />
          </div>
        ))}
      </GridLayout>
    </div>
  );
};

export default MyGrid;
