import React from "react";
import { Box, CircularProgress } from "@mui/material";

export const FullPageLoading = () => {
  return (
    <Box
      display={"flex"}
      width="full"
      height="100vh"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress color="success" />
    </Box>
  );
};
