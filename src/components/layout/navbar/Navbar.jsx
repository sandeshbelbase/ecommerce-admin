import React from "react";
// import { makeStyles } from "@mui/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Box } from "@mui/material";
import { logOut } from "../../helpers/firebase";

export default function Navbar({ setOpen, open }) {
  const handleLogout = async () => {
    await logOut();
  };
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        boxShadow: "0px 2px 10px #d7d7d7",
      }}
    >
      <Toolbar sx={{ background: "white" }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ color: (theme) => theme.palette.primary.main }}
          >
            Admin dashboard
          </Typography>
          <Box
            display="flex"
            sx={{
              color: (theme) => theme.palette.primary.main,
              cursor: "pointer",
            }}
          >
            <ExitToAppIcon />
            <Typography onClick={handleLogout}> Logout</Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
