import React from 'react';
import { CacheProvider, ThemeProvider } from "@emotion/react";
import { createRoot } from "react-dom/client";
import CssBaseline from '@mui/material/CssBaseline';

import App from "./App";
import cache from "./emotionCache";
import theme from "./theme";

const AppShell = () => {
	return (
		<CacheProvider value={cache}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<App />
			</ThemeProvider>
		</CacheProvider>
	);
};

createRoot(document.getElementById("root")).render(<AppShell />);
