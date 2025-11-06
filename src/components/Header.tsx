import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

export const Header: React.FC = () => (
  <AppBar
    position="fixed" // fixed keeps it always on top
    color="primary"
    sx={{
      zIndex: (theme) => theme.zIndex.drawer + 1, // ensures it stays above other content
    }}
  >
    <Toolbar>
      <Typography variant="h6" component="div">
        Library Management
      </Typography>
    </Toolbar>
  </AppBar>
);
