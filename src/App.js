import React from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { useRemoteComponent } from "./hooks/useRemoteComponent";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import ThrowError from "./components/ThrowError";

export default function App() {
  const {
    Component: TodoList,
    loading,
    error,
  } = useRemoteComponent("todoApp", "TodoList");

  return (
    <>
      <Header />
      <Box component="main" sx={{ display: "flex", flex: 1 }}>
        <Sidebar />
        <Box sx={{ flex: 1, p: 2 }}>
          <ErrorBoundary>
            {loading && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <CircularProgress />
                <Typography sx={{ ml: 2 }}>Loading remote…</Typography>
              </Box>
            )}

            {!loading && error && <ThrowError error={error} />}

            {!loading && !error && TodoList && <TodoList />}
          </ErrorBoundary>
        </Box>
      </Box>
      <Footer />
    </>
  );
}
