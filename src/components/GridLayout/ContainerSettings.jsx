import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';

const StyleEditorDialog = ({ open, containerStyle, setContainerStyle, onClose }) => {
  // Funzione per aggiornare il valore di una proprietà
  const handleChange = (key) => (event) => {
    setContainerStyle((prev) => ({ ...prev, [key]: event.target.value }));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Modifica Stile del Container</DialogTitle>
      <DialogContent>
        <TextField
          label="Width"
          fullWidth
          margin="normal"
          value={containerStyle.width || ''}
          onChange={handleChange('width')}
        />
        <TextField
          label="Max Width"
          fullWidth
          margin="normal"
          value={containerStyle.maxWidth || ''}
          onChange={handleChange('maxWidth')}
        />
        <TextField
          label="Height"
          fullWidth
          margin="normal"
          value={containerStyle.height || ''}
          onChange={handleChange('height')}
        />
        <TextField
          label="Max Height"
          fullWidth
          margin="normal"
          value={containerStyle.maxHeight || ''}
          onChange={handleChange('maxHeight')}
        />
        <TextField
          label="Background"
          fullWidth
          margin="normal"
          value={containerStyle.background || ''}
          onChange={handleChange('background')}
        />
        <TextField
          label="Padding"
          fullWidth
          margin="normal"
          value={containerStyle.padding || ''}
          onChange={handleChange('padding')}
        />
        <TextField
          label="Background Image"
          fullWidth
          margin="normal"
          value={containerStyle.backgroundImage || ''}
          onChange={handleChange('backgroundImage')}
        />
        <TextField
          label="Background Size"
          fullWidth
          margin="normal"
          value={containerStyle.backgroundSize || ''}
          onChange={handleChange('backgroundSize')}
        />
        <TextField
          label="Background Position"
          fullWidth
          margin="normal"
          value={containerStyle.backgroundPosition || ''}
          onChange={handleChange('backgroundPosition')}
        />
        <TextField
          label="Background Color"
          fullWidth
          margin="normal"
          value={containerStyle.backgroundColor || ''}
          onChange={handleChange('backgroundColor')}
        />
        <TextField
          label="Border Radius"
          fullWidth
          margin="normal"
          value={containerStyle.borderRadius || ''}
          onChange={handleChange('borderRadius')}
        />
        <TextField
          label="Overflow"
          fullWidth
          margin="normal"
          value={containerStyle.overflow || ''}
          onChange={handleChange('overflow')}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Chiudi</Button>
      </DialogActions>
    </Dialog>
  );
};

export default StyleEditorDialog;
