import React, { useState, useEffect } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import DeleteIcon from "@mui/icons-material/Delete"; // 📌 Importa l'icona di cancellazione
//import DragHandleIcon from "@mui/icons-material/DragHandle"


const MyGrid = ({ items, cols = 12, rowHeight = 50, width = 800, containerStyle = {} }) => {
  const [gridItems, setGridItems] = useState(items); // 📌 Stato per tenere traccia degli elementi
  const [layout, setLayout] = useState(items.map(({ i, x, y, w, h }) => ({ i, x, y, w, h })));
  
    const handleLayoutChange = (newLayout) => {
        setLayout(newLayout);
        console.log("Nuovo layout:", newLayout);
      };

    // 📌 Funzione per rimuovere un elemento
    const handleRemoveItem = (id) => {
      console.log("Id To Remove:", id);
      setGridItems(gridItems.filter((item) => item.i !== id));
      setLayout(layout.filter((item) => item.i !== id));
    };

    useEffect(() => {
      setGridItems(items);
      setLayout(items.map(({ i, x, y, w, h }) => ({ i, x, y, w, h })));
    }, [items]);

    return (
        <div style={{ ...containerStyle }}> {/* 📌 Il container ora prende tutto lo spazio disponibile */}
          <GridLayout
            className="layout"
            layout={layout}
            cols={cols}
            rowHeight={rowHeight}
            width={width}
            isDraggable={true}
            isResizable={true}
            verticalCompact={false} // Impedisce il raggruppamento verso l’alto
            preventCollision={true} // Impedisce collisioni
            style={{ width: "100%", height: "100%" }} // 📌 La griglia ora si adatta
            onLayoutChange={handleLayoutChange} // ✅ Ora funziona!
          >
            
            {gridItems.map(({ i, component, style }) => (
              <div key={i} style={{ 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                borderRadius: "8px", 
                padding: "10px", 
                fontSize: "16px", 
                ...style}}>
                  {/* 📌 Icona per eliminare il componente */}
                  <DeleteIcon
                      onClick={() => handleRemoveItem(i)}
                      style={{
                        position: "absolute",
                        top: "20",           // Centra verticalmente
                        right: "0",       // Sposta 30px fuori dal box a destra
                        transform: "translateY(-50%)",  // Aggiusta il centramento verticale
                        cursor: "pointer",
                        color: "red",
                        backgroundColor: "white",
                        borderRadius: "50%",
                        padding: "2px",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",  // Opzionale: aggiunge un'ombra
                      }}
                  />
                
                  {component}
              </div>
            ))}
          </GridLayout>
        </div>
      );
    };

export default MyGrid;