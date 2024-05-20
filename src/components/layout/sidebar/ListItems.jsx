import CountertopsIcon from "@mui/icons-material/Countertops";
import PaidIcon from "@mui/icons-material/Paid";
import { List } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import React from "react";
import { NavLink } from "react-router-dom";

const ListItems = () => {
  return (
    <List>
      <NavLink to="/product" style={{ textDecoration: "none" }}>
        <ListItem button>
          <ListItemIcon sx={{ paddingLeft: "15px !important" }}>
            <CountertopsIcon sx={{ color: "black" }} />
          </ListItemIcon>
          <ListItemText primary="Products" sx={{ color: "black" }} />
        </ListItem>
      </NavLink>

      <NavLink to="/banners" style={{ textDecoration: "none" }}>
        <ListItem button>
          <ListItemIcon sx={{ paddingLeft: "15px !important" }}>
            <CountertopsIcon sx={{ color: "black" }} />
          </ListItemIcon>
          <ListItemText primary="Banners" sx={{ color: "black" }} />
        </ListItem>
      </NavLink>

      <NavLink to="/transaction" style={{ textDecoration: "none" }}>
        <ListItem button>
          <ListItemIcon sx={{ paddingLeft: "15px !important" }}>
            <PaidIcon sx={{ color: "black" }} />
          </ListItemIcon>
          <ListItemText primary="Transactions" sx={{ color: "black" }} />
        </ListItem>
      </NavLink>
    </List>
  );
};

export default ListItems;
