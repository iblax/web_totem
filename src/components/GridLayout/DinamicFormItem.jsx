//Capire come passare i default, 
//come passare i main
//se usareil db per components e loro default


import React, { useEffect, useState } from "react";
import { TextField, Switch, Slider, Box, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

const DynamicSettingsForm = ({ open, settings = {}, mainSettings = {} ,onChange, onClose }) => {
  const [localSettings, setLocalSettings] = useState(settings);
  const [cornerSettings, setCornerSettings] = useState(mainSettings)

useEffect( ()=> { setLocalSettings(
    {
        buttonText: { props: "buttonText", value: "Scatta", type: "string", label: "Testo Pulsante" },
        buttonColor: { props: "buttonColor", value: "#1976d2", type: "color", label: "Colore Pulsante" },
        buttonSize: { props: "buttonSize", value: 16, type: "number", label: "Dimensione Testo" },
        useCamera: { props: "useCamera", value: true, type: "boolean", label: "Attiva Fotocamera" },
        brightness: { props: "brightness", value: 50, type: "slider", label: "Luminosità", min: 0, max: 100 },
      })
      setCornerSettings({
        buttonText: { props: "padding", value: "5", type: "string", label: "Padding" },
        buttonBack: { props: "buttonBack", value: "#1976d2", type: "color", label: "Colore Cornice" },
      })


}, [])



  // Funzione per aggiornare il valore delle impostazioni
  const handleInputChange = (prop, newValue) => {
    const updatedSettings = {
      ...localSettings,
      [prop]: { ...localSettings[prop], value: newValue },
    };
    setLocalSettings(updatedSettings);
    //onChange(updatedSettings); // Passa i nuovi settings al parent
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Modifica Stile del Container</DialogTitle>

      <DialogContent>
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}>
        <Box>
        <Typography>Main</Typography>
      { Object.entries(cornerSettings).map(([key, setting]) => (

        <Box key={key}>
        <Typography variant="subtitle1" fontWeight="bold">
            {setting.label}
        </Typography>

        {/* Input dinamico basato sul tipo */}
        {setting.type === "string" && (
            <TextField
            variant="outlined"
            fullWidth
            value={setting.value}
            onChange={(e) => handleInputChange(key, e.target.value)}
            label={setting.label}
            />
            )}

        {setting.type === "number" && (
            <TextField
            type="number"
            variant="outlined"
            fullWidth
            value={setting.value}
            onChange={(e) => handleInputChange(key, Number(e.target.value))}
            label={setting.label}
            />
            )}

        {setting.type === "boolean" && (
            <Switch
            checked={setting.value}
            onChange={(e) => handleInputChange(key, e.target.checked)}
            />
            )}

        {setting.type === "slider" && (
            <Slider
            value={setting.value}
            min={setting.min || 0}
            max={setting.max || 100}
            step={setting.step || 1}
            onChange={(e, newValue) => handleInputChange(key, newValue)}
            valueLabelDisplay="auto"
            />
            )}

        {setting.type === "color" && (
            <input
            type="color"
            value={setting.value}
            onChange={(e) => handleInputChange(key, e.target.value)}
            style={{
                width: "50px",
                height: "30px",
                border: "none",
                cursor: "pointer",
                }}
                />
            )}
        </Box>
        ))}
        <Typography>Component Settings</Typography>
      { Object.entries(localSettings).map(([key, setting]) => (

        <Box key={key}>
          <Typography variant="subtitle1" fontWeight="bold">
            {setting.label}
          </Typography>

          {/* Input dinamico basato sul tipo */}
          {setting.type === "string" && (
              <TextField
              variant="outlined"
              fullWidth
              value={setting.value}
              onChange={(e) => handleInputChange(key, e.target.value)}
              label={setting.label}
              />
            )}

          {setting.type === "number" && (
              <TextField
              type="number"
              variant="outlined"
              fullWidth
              value={setting.value}
              onChange={(e) => handleInputChange(key, Number(e.target.value))}
              label={setting.label}
              />
            )}

          {setting.type === "boolean" && (
              <Switch
              checked={setting.value}
              onChange={(e) => handleInputChange(key, e.target.checked)}
              />
            )}

          {setting.type === "slider" && (
              <Slider
              value={setting.value}
              min={setting.min || 0}
              max={setting.max || 100}
              step={setting.step || 1}
              onChange={(e, newValue) => handleInputChange(key, newValue)}
              valueLabelDisplay="auto"
              />
            )}

          {setting.type === "color" && (
              <input
              type="color"
              value={setting.value}
              onChange={(e) => handleInputChange(key, e.target.value)}
              style={{
                  width: "50px",
                  height: "30px",
                  border: "none",
                  cursor: "pointer",
                }}
                />
            )}
        </Box>
      ))}
      </Box>
    </Box>
    </DialogContent>
    <DialogActions>
          {/* Tasto Close */}
          <Button onClick={onClose} color="secondary">
            Chiudi
          </Button>
          {/* Tasto Save 
          <Button onClick={handleSave} color="primary">
            Salva
          </Button>
              */}
        </DialogActions>
    </Dialog>
);
};

export default DynamicSettingsForm;