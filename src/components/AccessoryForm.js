import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

const AccessoryForm = ({ devices = [], onSave, initialData }) => {
  const [currentAccessory, setCurrentAccessory] = useState({
    name: "",
    image: "",
    deviceId: "",
  });

  useEffect(() => {
    if (initialData) {
      setCurrentAccessory(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setCurrentAccessory({
      ...currentAccessory,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    onSave(currentAccessory); // Pass the single accessory to onSave
    setCurrentAccessory({
      name: "",
      image: "",
      deviceId: "",
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={currentAccessory.name}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Image URL"
          name="image"
          value={currentAccessory.image}
          onChange={handleChange}
        />
      </Grid>
      {devices.length > 0 && (
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="device-select-label">Device</InputLabel>
            <Select
              labelId="device-select-label"
              id="device-select"
              name="deviceId"
              value={currentAccessory.deviceId}
              onChange={handleChange}
            >
              {devices.map((device) => (
                <MenuItem key={device.id} value={device.id}>
                  {device.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      )}
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Save
        </Button>
      </Grid>
    </Grid>
  );
};

export default AccessoryForm;
