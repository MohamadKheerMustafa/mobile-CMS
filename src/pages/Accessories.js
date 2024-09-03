import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Grid,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Container,
} from "@mui/material";
import { Delete, Edit, Info } from "@mui/icons-material";
import AccessoryForm from "../components/AccessoryForm";

const Accessories = () => {
  const [accessories, setAccessories] = useState([]);
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [isFormVisible, setFormVisible] = useState(false);
  const [selectedAccessory, setSelectedAccessory] = useState(null);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("devicesData")) || [];
    setDevices(storedData);
    const allAccessories = storedData.flatMap(
      (device) => device.accessories || []
    );
    setAccessories(allAccessories);
  }, []);

  const handleDeviceChange = (event) => {
    const deviceId = event.target.value;
    setSelectedDeviceId(deviceId);
    const filteredAccessories =
      devices.find((device) => device.id === deviceId)?.accessories || [];
    setAccessories(filteredAccessories);
  };

  const handleDelete = (id) => {
    const updatedDevices = devices.map((device) => {
      if (device.accessories.some((accessory) => accessory.id === id)) {
        return {
          ...device,
          accessories: device.accessories.filter(
            (accessory) => accessory.id !== id
          ),
        };
      }
      return device;
    });

    setDevices(updatedDevices);
    localStorage.setItem("devicesData", JSON.stringify(updatedDevices));
    setAccessories(
      updatedDevices.find((device) => device.id === selectedDeviceId)
        ?.accessories || []
    );
  };

  const handleSaveAccessory = (accessory) => {
    const updatedDevices = devices.map((device) => {
      if (device.id === accessory.deviceId) {
        const existingAccessories = device.accessories || [];

        // Update if accessory exists, otherwise add new one
        const updatedAccessories = existingAccessories.some(
          (a) => a.id === accessory.id
        )
          ? existingAccessories.map((a) =>
              a.id === accessory.id ? accessory : a
            )
          : [...existingAccessories, { ...accessory, id: Date.now() }]; // Assign a unique ID if new

        return { ...device, accessories: updatedAccessories };
      }
      return device;
    });

    setDevices(updatedDevices);
    localStorage.setItem("devicesData", JSON.stringify(updatedDevices));
    setFormVisible(false);
    setAccessories(
      updatedDevices.find((device) => device.id === selectedDeviceId)
        ?.accessories || []
    );
  };

  const handleEdit = (accessory) => {
    setSelectedAccessory(accessory);
    setFormVisible(true);
  };

  const handleCreateClick = () => {
    setSelectedAccessory(null);
    setFormVisible(true);
  };

  const handleCancelClick = () => {
    setFormVisible(false);
    setSelectedAccessory(null);
  };

  return (
    <Container maxWidth="md">
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h4" align="center" gutterBottom>
            Accessories List
          </Typography>
        </Grid>

        <Grid item xs={12} md={8}>
          <FormControl fullWidth>
            <InputLabel id="device-select-label">Select Device</InputLabel>
            <Select
              labelId="device-select-label"
              id="device-select"
              value={selectedDeviceId}
              onChange={handleDeviceChange}
              fullWidth
            >
              {devices.map((device) => (
                <MenuItem key={device.id} value={device.id}>
                  {device.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={8}>
          <Button
            variant="contained"
            color="primary"
            onClick={isFormVisible ? handleCancelClick : handleCreateClick}
            fullWidth
            style={{ marginTop: "20px" }}
          >
            {isFormVisible ? "Cancel" : "Add Accessory"}
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Device Name</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {accessories.length > 0 ? (
                accessories.map((accessory) => {
                  const device = devices.find(
                    (device) => device.id === accessory.deviceId
                  );
                  return (
                    <TableRow key={accessory.id}>
                      <TableCell>{accessory.name}</TableCell>
                      <TableCell>
                        <img
                          src={accessory.image}
                          alt={accessory.name}
                          width={50}
                        />
                      </TableCell>
                      <TableCell>
                        {device ? device.name : "Unknown Device"}
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleEdit(accessory)}>
                          <Edit />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(accessory.id)}>
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={4}>No accessories found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Grid>

        {isFormVisible && (
          <Grid item xs={12}>
            <AccessoryForm
              devices={devices}
              onSave={handleSaveAccessory}
              initialData={selectedAccessory}
            />
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Accessories;
