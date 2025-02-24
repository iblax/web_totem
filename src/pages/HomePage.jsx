//import React, { useState } from 'react';
//import {Button} from '@mui/material'
//import QRCodeDisplay from '../components/QRCodeDisplay';
//import GridLayout from '../components/GridLayout/GridLayoutStore';
//import ContainerSettings from '../components/GridLayout/ContainerSettings.jsx'
import LayoutEditor from '../components/GridLayout/LayoutEditor'
//import ContainerSettings from '../components/GridLayout/ContainerSettings'

const HomePage = () => {


  /*
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
  */


  return (
    <div>
      <h1>Home</h1>
      <LayoutEditor />
      {/* <QRCodeDisplay onAcceptPrivacy={() => setPrivacyAccepted(true)} /> 
      <GridLayout layoutData={layoutJSON} cols={12} rowHeight={60} width={1000}/>
      <Button variant="contained" onClick={() => setOpenDialog(true)}>
        Modifica Stile Container
      </Button>



            <GridLayout style={{ margin:10}} items={null} cols={50} rowHeight={5} width={1280} height={720} containerStyle={containerStyle}/>
      */}

    </div>
  );
};

export default HomePage;
