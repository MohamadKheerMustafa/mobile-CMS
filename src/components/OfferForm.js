import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

const OfferForm = ({
  devices = [],
  accessories = [],
  onSave,
  initialData,
  selectedDeviceId,
}) => {
  const [offer, setOffer] = useState({
    deviceId: "",
    selectedAccessories: [],
    offerPrice: "",
    offerEndDate: "",
  });

  useEffect(() => {
    if (initialData) {
      setOffer(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setOffer({ ...offer, [e.target.name]: e.target.value });
  };

  const handleAccessoryChange = (e, accessoryId) => {
    let selected = [...offer.selectedAccessories];
    if (e.target.checked) {
      // Add accessory ID if checkbox is checked
      selected = [...selected, accessoryId];
    } else {
      // Remove accessory ID if checkbox is unchecked
      selected = selected.filter((id) => id !== accessoryId);
    }
    setOffer({ ...offer, selectedAccessories: selected });
  };

  const handleSubmit = () => {
    // Include the selectedDeviceId from the parent component
    const offerWithDeviceId = { ...offer, deviceId: selectedDeviceId };
    onSave(offerWithDeviceId);
    setOffer({
      deviceId: "",
      selectedAccessories: [],
      offerPrice: "",
      offerEndDate: "",
    });
  };

  return (
    <Grid
      container
      spacing={2}
      direction="column"
      alignItems="center"
      style={{ padding: "20px" }}
    >
      <Grid item xs={12} sm={8} md={6} style={{ marginTop: "20px" }}>
        {accessories.length > 0 ? (
          accessories.map((accessory) => (
            <FormControlLabel
              key={accessory.id}
              control={
                <Checkbox
                  checked={offer.selectedAccessories.includes(accessory.id)}
                  onChange={(e) => handleAccessoryChange(e, accessory.id)}
                />
              }
              label={accessory.name}
            />
          ))
        ) : (
          <p>No accessories available</p>
        )}
      </Grid>

      <Grid item xs={12} sm={8} md={6} style={{ marginTop: "20px" }}>
        <TextField
          fullWidth
          label="Offer Price"
          name="offerPrice"
          value={offer.offerPrice}
          onChange={handleChange}
          variant="outlined"
        />
      </Grid>

      <Grid item xs={12} sm={8} md={6} style={{ marginTop: "20px" }}>
        <TextField
          fullWidth
          label="Offer End Date"
          name="offerEndDate"
          type="date"
          value={offer.offerEndDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          variant="outlined"
        />
      </Grid>

      <Grid item xs={12} sm={8} md={6} style={{ marginTop: "20px" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          fullWidth
        >
          Save Offer
        </Button>
      </Grid>
    </Grid>
  );
};

export default OfferForm;
