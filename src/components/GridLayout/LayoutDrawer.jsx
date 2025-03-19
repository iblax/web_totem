import React, { useEffect, Suspense, useState, forwardRef,useImperativeHandle} from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { useDispatch } from "react-redux";//useSelector,
import { setNewLayout, saveLayoutToServer } from "../../redux/layoutSlice.js";
import { Button, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import OpenWithRoundedIcon from '@mui/icons-material/OpenWithRounded';
import componentMap from "./ComponentMap.js"
import ContainerSettings from './ContainerSettings.jsx'
const LayoutDrawer = forwardRef( ({ assignedLayout , cols = 24, width= 1000, height=720, isEditor=false }, ref) => {
  
    const dispatch = useDispatch();
    const [myLayout, setMyLayout ] = useState();
    const [openDialog, setOpenDialog] = useState(false)
  
    //CREARE INTERFACCIA MODIFICA COMPONENTI

        // Espone funzioni al parent
    useImperativeHandle(ref, () => ({
        SaveLayout,
        setOpenDialog
    }));


    useEffect( () => {
        console.log("a", assignedLayout)
        setMyLayout(assignedLayout)
    }, [assignedLayout])

    const handleLayoutChange = (newLayout) => {
        console.log("newLayout ricevuto:", newLayout);
    
        const updatedGridItems = newLayout.map(layoutItem => {
        // Cerca prima in myLayout, poi in assignedLayout per retrocompatibilità
        const existingItem = (myLayout?.gridItems || []).find(item => item.i === layoutItem.i) 
            || (assignedLayout?.gridItems || []).find(item => item.i === layoutItem.i) 
            || {};
        
        return {
            ...existingItem,
            i: layoutItem.i,
            x: Number(layoutItem.x) || 0,
            y: Number(layoutItem.y) || 0,
            w: Number(layoutItem.w) || 1,
            h: Number(layoutItem.h) || 1,
        };
        });
    
        // Utilizziamo una funzione di aggiornamento per basarci sullo stato corrente
        setMyLayout(prevLayout => {
        if (!prevLayout) return {
            ...assignedLayout,
            gridItems: updatedGridItems
        };
        
        return {
            ...prevLayout,  // Mantiene tutte le altre proprietà CORRENTI (incluso container modificato)
            gridItems: updatedGridItems, // Aggiorna solo gridItems
        };
        });
    
        console.log("Layout aggiornato:", myLayout);
    };

    const updateContainerStyle = (newStyle) => {
        setMyLayout(prevLayout => {
        if (!prevLayout) return null;
    
        const updatedLayout = {
            ...prevLayout,
            containerStyle: {
            ...(prevLayout.containerStyle || {}), // Mantieni gli stili esistenti
            ...newStyle, // Aggiorna solo le nuove proprietà
            }
        };
    
        console.log("✅ ContainerStyle aggiornato:", updatedLayout.containerStyle);
        return updatedLayout;
        });
    };

    const updateContainer = (newContainer) => {
        console.log("Updating container:", newContainer);
        setMyLayout(prevLayout => ({
        ...prevLayout,
        container: newContainer
        }));
        console.log("Layout::", myLayout);
    };
    
    const handleDelete = (targetId) => {
        console.log("ItemToDelete", targetId);
        if (window.confirm("Sei sicuro di voler eliminare questo elemento?")) {
        const updatedGridItems = myLayout?.gridItems.filter(item => item.i !== targetId);
    
        // Aggiorna lo stato con il nuovo layout senza l'elemento eliminato
        setMyLayout(prevLayout => ({
            ...prevLayout,
            gridItems: updatedGridItems
        }));
        }
    };

    const SaveLayout = () => {
        dispatch(setNewLayout(myLayout));   
        dispatch(saveLayoutToServer());
        console.log("LAyout To Set", myLayout)
    }


  return (
      
      <Box > {/* sx={{flexDirection: 'column', display: 'flex'}} */}

         

        <GridLayout 
        style={{ 
            ...myLayout?.containerStyle,
            width: `${myLayout?.container?.width}px`,
            height: `${myLayout?.container?.height}px`,
        }}
          isBounded={false}       // Modificato a true per mantenere gli elementi all'interno
          preventCollision={true}
          className="layout"
          layout={myLayout?.gridItems}
          rowHeight={(myLayout?.container?.height || height) / cols}
          cols={cols}
          width={myLayout?.container?.width || width}
          height={myLayout?.container?.height || height}
          isDraggable={isEditor ?? false }
          isResizable={isEditor ?? false}
          verticalCompact={false}
          horizontalCompact={false}
          onLayoutChange={handleLayoutChange}
          draggableHandle=".drag-handle"
        >
        {myLayout?.gridItems?.map(({ i, x, y, w, h, componentType, style }) => {
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
                    { isEditor && (
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
                    )}
                </div>
            );
            })}
        </GridLayout>
    
        {/* 
          Modifica LAyout Esistente
        */}

        <ContainerSettings
            isNew={false}
            open={openDialog}
            container={myLayout?.container}
            containerStyle={myLayout?.containerStyle} // Passiamo il containerStyle aggiornato
            setContainerStyle={updateContainerStyle} // Assicuriamoci di passare la funzione giusta
            setContainer={updateContainer}
            onClose={() => setOpenDialog(false)}
        />
  </Box>
  );
});

export default LayoutDrawer;


 // Funzione per aggiornare lo stile dinamicamente
    /*
    const updateContainerStyle = (containerStyle) => {
      dispatch(setContainerStyle(containerStyle));
    };
    */
    
    /*
    useEffect(() => {
      //dispatch(setContainerStyle(containerStyle));
      console.log("CONTAINER STYLE useEffect", containerS)
    }, 
    [dispatch, containerS ]); //containerStyle
*/

  // Carica il layout dal server all'avvio
  /*
  useEffect(() => {
    console.log("useffectLAyoutID", assignedLayout)

    //dispatch(fetchLayout(layoutId));
  }, [dispatch]);
  */

      /*
    // Creiamo il nuovo array aggiornato con posizione e dimensioni
    const updatedGridItems = newLayout.map(layoutItem => {
      const existingItem = assignedLayout?.gridItems.find(item => item.i === layoutItem.i);
      return {
        ...existingItem, // Mantiene componentType, style e altre proprietà esistenti
        ...layoutItem,   // Aggiorna x, y, w, h e altre proprietà del layout
      };
    });
    */


    /*
    <GridLayout style={{ ...myLayout?.containerStyle }}
      isBounded={false}       // <-- Mantiene gli item dentro il contenitore // faceva confusione
      preventCollision={true}
      className="layout"
      layout={myLayout?.gridItems} //????? cambiare gestione e mettere nello stesso oggetto gridItems come figlio o come tabella a parte
      rowHeight={myLayout?.container?.height / cols}
      //maxWidth={myLayout?.containerStyle?.width || width}
      cols={cols}
      
      width={myLayout?.container?.width || width} // Use the width from props as fallback
      height={myLayout?.container?.height || height}
      maxWidth={myLayout?.container?.width || width} // Use the width from props as fallback
      maxHeight={myLayout?.container?.height || height}
      // to pass parameter
      //maxHeight={myLayout?.containerStyle?.height}
      isDraggable={true}
      isResizable={true}
      verticalCompact={false}
      horizontalCompact={false}
      onLayoutChange={handleLayoutChange}
      draggableHandle=".drag-handle" // Solo l'elemento con questa classe sarà trascinabile
      >
      {myLayout?.gridItems?.map(({ i, x, y, w, h, componentType, style }) => {
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

    */

       /* sx={{flexDirection: 'row', display: 'flex'}} 
        <Box > 
            <Button onClick={SaveLayout} variant="contained" color="primary" sx={{margin: 5}}>
            Salva Layout su Server
            </Button>
            <Button variant="contained" onClick={() => setOpenDialog(true)}>
                Modifica Stile Container
            </Button>
        </Box>
              */
