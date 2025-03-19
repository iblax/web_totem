import {useState, useEffect} from 'react'
import React from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';

const StyleEditorDialog = ({ open, container ,containerStyle, setContainerStyle, setContainer, onClose, isNew, setLayoutName, createNewLayout }) => {
  // Funzione per aggiornare il valore di una proprietà
  const [localStyle, setLocalStyle] = useState(containerStyle || {});
  const [localContainer, setLocalContainer] = useState(container || {});

  const [newLayoutName, setNewLayoutName] = useState("NoName")
  const createLayout = () => {
    console.log("Create Input Called");
    createNewLayout(localStyle,localContainer, newLayoutName);

  }

  useEffect(() => {
    setLocalStyle(containerStyle); // Aggiorna il localStyle quando cambia il containerStyle
  }, [containerStyle]);

    // Aggiorna localContainer quando cambia container
    useEffect(() => {
      setLocalContainer(container || {});
    }, [container]);

  const handleChange = (key) => (event) => {
    const newStyle = { ...localStyle, [key]: event.target.value };
    setLocalStyle(newStyle);
    setContainerStyle(newStyle);
  };

  const handleContainerChange = (key) => (event) => {
    const newContainer = { ...localContainer, [key]: parseInt(event.target.value) || event.target.value };
    setLocalContainer(newContainer);
    setContainer(newContainer);
  };
  

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Modifica Stile del Container</DialogTitle>
      <DialogContent>
        {
          isNew ? 
          <TextField
          value={newLayoutName}
          label="Layout Name"
          fullWidth
          margin="normal"
          onChange={(e) => setNewLayoutName(e.target.value)}
        /> : <></>
        }
        <TextField
          label="Width"
          fullWidth
          margin="normal"
          value={container?.width || ''}
          onChange={handleContainerChange('width')}
        />
        <TextField
          label="Height"
          fullWidth
          margin="normal"
          value={container?.height || ''}
          onChange={handleContainerChange('height')}
        />
        <TextField
          label="Background"
          fullWidth
          margin="normal"
          value={localStyle?.background || ''}
          onChange={handleChange('background')}
        />
        <TextField
          label="Padding"
          fullWidth
          margin="normal"
          value={localStyle?.padding || ''}
          onChange={handleChange('padding')}
        />
        <TextField
          label="Background Image"
          fullWidth
          margin="normal"
          value={localStyle?.backgroundImage || ''}
          onChange={handleChange('backgroundImage')}
        />
        <TextField
          label="Background Size"
          fullWidth
          margin="normal"
          value={localStyle?.backgroundSize || ''}
          onChange={handleChange('backgroundSize')}
        />
        <TextField
          label="Background Position"
          fullWidth
          margin="normal"
          value={localStyle?.backgroundPosition || ''}
          onChange={handleChange('backgroundPosition')}
        />
        <TextField
          label="Background Color"
          fullWidth
          margin="normal"
          value={localStyle?.backgroundColor || ''}
          onChange={handleChange('backgroundColor')}
        />
        <TextField
          label="Border Radius"
          fullWidth
          margin="normal"
          value={localStyle?.borderRadius || ''}
          onChange={handleChange('borderRadius')}
        />
        <TextField
          label="Overflow"
          fullWidth
          margin="normal"
          value={localStyle?.overflow || ''}
          onChange={handleChange('overflow')}
        />
      </DialogContent>

{
  isNew ?
    <DialogActions>
      <Button onClick={createLayout} color="primary">Create</Button>
      <Button onClick={onClose} color="primary">Cancel</Button>
    </DialogActions>

      : 
    <DialogActions>
      <Button onClick={onClose} color="primary">Chiudi</Button>
    </DialogActions>
}      
    
    </Dialog>
  );
};

export default StyleEditorDialog;
