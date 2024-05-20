import React from "react";
import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";

export const Layout = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Navbar />
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, background: '#f8f8f8', padding: '0px 30px' }}>
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </>
  );
};
