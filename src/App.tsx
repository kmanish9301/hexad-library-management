import React from "react";
import { CssBaseline, Box } from "@mui/material";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { LibraryProvider } from "./context/LibraryProvider";

function App() {
  return (
    <LibraryProvider>
      <CssBaseline />
      <Header />
      <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
        <Home />
      </Box>
    </LibraryProvider>
  );
}

export default App;
