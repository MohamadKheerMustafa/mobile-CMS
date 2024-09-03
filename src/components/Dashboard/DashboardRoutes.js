import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Devices from "../../pages/Devices";
import DeviceDetails from "../../pages/DeviceDetails";
import Accessories from "../../pages/Accessories";
import Offers from "../../pages/Offers";
import { Typography } from "@material-ui/core";

export default function DashboardRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Dashboard>
            <Typography> Welcome To CMS </Typography>
          </Dashboard>
        }
      />
      <Route
        path="/devices"
        element={
          <Dashboard>
            <Devices />
          </Dashboard>
        }
      />
      <Route
        path="/device-details/:deviceId"
        element={
          <Dashboard>
            <DeviceDetails />
          </Dashboard>
        }
      />
      <Route
        path="/accessories"
        element={
          <Dashboard>
            <Accessories />
          </Dashboard>
        }
      />
      <Route
        path="/offers"
        element={
          <Dashboard>
            <Offers />
          </Dashboard>
        }
      />
    </Routes>
  );
}
