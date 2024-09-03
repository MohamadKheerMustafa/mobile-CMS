import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Grid,
  TableContainer,
  Paper,
  Typography,
} from "@mui/material";
import { Delete, Edit, Info } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import DeviceForm from "../components/DeviceForm";

const Devices = () => {
  const [devices, setDevices] = useState([]);
  const [isFormVisible, setFormVisible] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("devicesData")) || [];
    setDevices(storedData);
  }, []);

  const handleCreateClick = () => {
    setSelectedDevice(null);
    setFormVisible(true);
  };

  const handleCancelClick = () => {
    setSelectedDevice(null);
    setFormVisible(false);
  };

  const handleSaveDevice = (device) => {
    let updatedDevices;
    if (selectedDevice) {
      updatedDevices = devices.map((d) =>
        d.id === selectedDevice.id ? { ...device, id: selectedDevice.id } : d
      );
    } else {
      const newDevice = { ...device, id: devices.length + 1 };
      updatedDevices = [...devices, newDevice];
    }
    setDevices(updatedDevices);
    localStorage.setItem("devicesData", JSON.stringify(updatedDevices));
    setFormVisible(false);
  };

  const handleDelete = (id) => {
    const updatedDevices = devices.filter((device) => device.id !== id);
    setDevices(updatedDevices);
    localStorage.setItem("devicesData", JSON.stringify(updatedDevices));
  };

  const handleDetailsClick = (deviceId) => {
    navigate(`/device-details/${deviceId}`);
  };

  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
      style={{
        display: "flex",
        textAlign: "center",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Device List
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Made in</TableCell>
                <TableCell>RAM Size</TableCell>
                <TableCell>Storage Size</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {devices.length > 0 ? (
                devices.map((device) => (
                  <TableRow key={device.id}>
                    <TableCell>{device.name}</TableCell>
                    <TableCell>{device.madeIn}</TableCell>
                    <TableCell>{device.ramSize} GB</TableCell>
                    <TableCell>{device.storageSize} GB</TableCell>
                    <TableCell>
                      <img src={device.image} alt={device.id} />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => {
                          setSelectedDevice(device);
                          setFormVisible(true);
                        }}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(device.id)}>
                        <Delete />
                      </IconButton>
                      <IconButton onClick={() => handleDetailsClick(device.id)}>
                        <Info />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5}>No devices found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={isFormVisible ? handleCancelClick : handleCreateClick}
          fullWidth
          sx={{
            maxWidth: "300px",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          {isFormVisible ? "Cancel" : "Create Device"}
        </Button>
      </Grid>

      {isFormVisible && (
        <Grid
          item
          xs={12}
          md={6}
          lg={4}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <DeviceForm initialData={selectedDevice} onSave={handleSaveDevice} />
        </Grid>
      )}
    </Grid>
  );
};

export default Devices;
