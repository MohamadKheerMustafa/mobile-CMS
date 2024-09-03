import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Dashboard, Devices, Percent, Settings } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ListItems = () => {
  const navigate = useNavigate();

  return (
    <div>
      <ListItem button onClick={() => navigate("/")}>
        <ListItemIcon>
          <Dashboard />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button onClick={() => navigate("/devices")}>
        <ListItemIcon>
          <Devices />
        </ListItemIcon>
        <ListItemText primary="Devices" />
      </ListItem>
      <ListItem button onClick={() => navigate("/accessories")}>
        <ListItemIcon>
          <Settings />
        </ListItemIcon>
        <ListItemText primary="Accessories" />
      </ListItem>
      <ListItem button onClick={() => navigate("/offers")}>
        <ListItemIcon>
          <Percent />
        </ListItemIcon>
        <ListItemText primary="Offers" />
      </ListItem>
    </div>
  );
};

export default ListItems;
