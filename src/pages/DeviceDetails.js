import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const DeviceDetails = () => {
  const { deviceId } = useParams();
  const [device, setDevice] = useState(null);
  const [accessories, setAccessories] = useState([]);
  const [offers, setOffers] = useState([]);
  const [allAccessories, setAllAccessories] = useState([]);

  useEffect(() => {
    const storedDevices = JSON.parse(localStorage.getItem("devicesData")) || [];

    storedDevices.map((item) => {
      setAllAccessories(item.accessories);
    });

    const storedOffers = storedDevices.map((item) => {
      return item.offer;
    });

    const deviceDetails = storedDevices.find(
      (d) => d.id === parseInt(deviceId)
    );
    const deviceAccessories = allAccessories.filter(
      (acc) => acc.deviceId === parseInt(deviceId)
    );
    const deviceOffers = storedOffers.filter(
      (offer) => offer.deviceId === parseInt(deviceId)
    );

    setDevice(deviceDetails);
    setAccessories(deviceAccessories);
    setOffers(deviceOffers);
    // console.log(deviceAccessories);
  }, [deviceId]);
  console.log(accessories);

  if (!device) return <Typography>Loading...</Typography>;
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">Device Details</Typography>
        <Typography variant="h6">Name: {device.name}</Typography>
        <Typography>Made in: {device.madeIn}</Typography>
        <Typography>RAM Size: {device.ramSize} GB</Typography>
        <Typography>Storage Size: {device.storageSize} GB</Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h5">Accessories</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Image</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accessories.map((accessory) => (
              <TableRow key={accessory.id}>
                <TableCell>{accessory.name}</TableCell>
                <TableCell>
                  <img
                    src={require(accessory.image)}
                    alt={accessory.name}
                    width={50}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h5">Offers</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Offer Price</TableCell>
              <TableCell>End Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {offers.map((offer) => (
              <TableRow key={offer.id}>
                <TableCell>{offer.offerPrice}</TableCell>
                <TableCell>{offer.offerEndDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  );
};

export default DeviceDetails;
