import React from 'react';
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useRemoteComponent } from "../hooks/useRemoteComponent";
import Typography from '@mui/material/Typography';
import ErrorBoundary from './ErrorBoundary';
import ThrowError from './ThrowError';

export default function RemoteAppContainer() {
  const {
    Component: AppContainer,
    loading,
    error,
  } = useRemoteComponent("appContainer", "AppContainer");

  return (
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
            <Typography sx={{ ml: 2 }}>Loading App Container</Typography>
          </Box>
        )}

        {!loading && error && <ThrowError error={error} />}

        {!loading && !error && AppContainer && <AppContainer />}
      </ErrorBoundary>
    </Box>
  );
}
