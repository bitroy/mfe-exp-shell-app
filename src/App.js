import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Box from "@mui/material/Box";
import RemoteAppContainer from "./components/RemoteAppContainer";

export default function App() {
  return (
    <>
      <Header />
      <Box component="main" sx={{ display: "flex", flex: 1 }}>
        <Sidebar />
        <RemoteAppContainer />
      </Box>
      <Footer />
    </>
  );
}
