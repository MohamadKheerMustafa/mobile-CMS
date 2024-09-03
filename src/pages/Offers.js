import React, { useState, useEffect } from "react";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import OfferForm from "../components/OfferForm"; // Ensure this import is correct

const Offers = () => {
  const [offers, setOffers] = useState([]);
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const storedDevices = JSON.parse(localStorage.getItem("devicesData")) || [];
    setDevices(storedDevices);

    const offersData = storedDevices.flatMap((device) => device.offers || []);
    setOffers(offersData);
  }, []);

  useEffect(() => {
    if (selectedDeviceId) {
      const device = devices.find((d) => d.id === selectedDeviceId);
      if (device) {
        const offer = device.offers?.[0] || null;
        setSelectedOffer(offer);
      }
    }
  }, [selectedDeviceId, devices]);

  const handleDeviceChange = (event) => {
    setSelectedDeviceId(event.target.value);
    setShowForm(false); // Hide the form when switching devices
  };

  const handleAddOfferClick = () => {
    setShowForm((prev) => !prev); // Toggle form visibility
  };

  const handleSaveOffer = (offer) => {
    const updatedDevices = devices.map((device) => {
      if (device.id === selectedDeviceId) {
        const newOffers = device.offers ? [offer] : [offer];
        return { ...device, offers: newOffers };
      }
      return device;
    });
    setDevices(updatedDevices);
    localStorage.setItem("devicesData", JSON.stringify(updatedDevices));
    setShowForm(false); // Hide the form after saving
  };

  const handleDeleteOffer = () => {
    const updatedDevices = devices.map((device) => {
      if (device.id === selectedDeviceId) {
        return { ...device, offers: [] };
      }
      return device;
    });
    setDevices(updatedDevices);
    localStorage.setItem("devicesData", JSON.stringify(updatedDevices));
    setShowForm(false); // Hide the form after deleting
  };

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item xs={12} md={8} lg={6}>
        <FormControl style={{ width: "80%" }}>
          <InputLabel id="device-select-label">Select Device</InputLabel>
          <Select
            labelId="device-select-label"
            id="device-select"
            value={selectedDeviceId}
            onChange={handleDeviceChange}
          >
            {devices.map((device) => (
              <MenuItem key={device.id} value={device.id}>
                {device.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {selectedDeviceId && (
        <Grid item xs={12} md={8} lg={6} style={{ marginTop: "20px" }}>
          {selectedOffer ? (
            <>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Device</TableCell>
                    <TableCell>Accessories</TableCell>
                    <TableCell>Offer Price</TableCell>
                    <TableCell>Offer End Date</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      {devices.find((d) => d.id === selectedDeviceId)?.name}
                    </TableCell>
                    <TableCell>
                      {selectedOffer.selectedAccessories
                        .map(
                          (accId) =>
                            devices
                              .flatMap((d) => d.accessories || [])
                              .find((a) => a.id === accId)?.name
                        )
                        .join(", ")}
                    </TableCell>
                    <TableCell>{selectedOffer.offerPrice}</TableCell>
                    <TableCell>{selectedOffer.offerEndDate}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleDeleteOffer}
                      >
                        Delete Offer
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </>
          ) : (
            <Grid
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={12}>
                <p>No offer on this device</p>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddOfferClick}
                  fullWidth
                >
                  {showForm ? "Cancel" : "Add Offer"}
                </Button>
              </Grid>
            </Grid>
          )}

          {showForm && (
            <OfferForm
              devices={devices}
              accessories={
                devices.find((device) => device.id === selectedDeviceId)
                  ?.accessories || []
              }
              onSave={handleSaveOffer}
              initialData={selectedOffer}
              selectedDeviceId={selectedDeviceId} // Pass this to OfferForm
            />
          )}
        </Grid>
      )}
    </Grid>
  );
};

export default Offers;
