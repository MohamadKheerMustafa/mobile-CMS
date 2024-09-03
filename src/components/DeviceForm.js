import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Paper, Typography } from "@mui/material";

const DeviceForm = ({ onSave, initialData }) => {
  const [device, setDevice] = useState({
    name: "",
    madeIn: "",
    image: "",
    ramSize: "",
    storageSize: "",
  });

  useEffect(() => {
    if (initialData) {
      setDevice(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setDevice({ ...device, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(device);
    setDevice({
      name: "",
      madeIn: "",
      image: "",
      ramSize: "",
      storageSize: "",
    });
  };

  return (
    <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
      <Typography variant="h5" gutterBottom>
        {initialData ? "Edit Device" : "Create Device"}
      </Typography>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        style={{ textAlign: "center" }}
      >
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={device.name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Made in (Date)"
            name="madeIn"
            type="date"
            value={device.madeIn}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Image URL"
            name="image"
            value={device.image}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            fullWidth
            label="RAM size (GB)"
            name="ramSize"
            value={device.ramSize}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            fullWidth
            label="Storage size (GB)"
            name="storageSize"
            value={device.storageSize}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default DeviceForm;
