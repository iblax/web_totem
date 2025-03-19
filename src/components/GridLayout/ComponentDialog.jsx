import {useState, useEffect} from 'react'
import React from 'react';
import componentMap from "./ComponentMap.js"

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl, 
  InputLabel, 
  MenuItem, 
  Select
} from '@mui/material';



const ComponentDialog = ({open, onClose, addComponent}) => {
    const [selectedKey, setSelectedKey] = useState(""); // Assicurati che sia inizializzato correttamente


    const handleChange = (event) => {
        const selectedValue = event.target.value;
        console.log("Componente selezionato:", selectedValue); // Debug
        setSelectedKey(selectedValue);
    }
      

    const componentNames = Object.keys(componentMap); // Ottieni le chiavi dell'oggetto

const addComp = () => {
    addComponent(selectedKey);
}
    

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Seleziona il componente da aggiungere</DialogTitle>
            <FormControl  fullWidth>
                <InputLabel>Seleziona un componente</InputLabel>
                <Select value={selectedKey} onChange={handleChange}>
                    {componentNames.map((key) => (
                    <MenuItem key={key} value={key}>
                     * {key} * {/* Nome leggibile del componente */}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
                <DialogActions>
      <Button onClick={addComp} color="primary">Add</Button>
      <Button onClick={onClose} color="primary">Cancel</Button>
    </DialogActions>
        </Dialog>
    );
}

export default ComponentDialog;