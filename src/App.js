import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import DashboardRoutes from "./components/Dashboard/DashboardRoutes";

export default function App() {
  return (
    <Router>
      <DashboardRoutes />
    </Router>
  );
}