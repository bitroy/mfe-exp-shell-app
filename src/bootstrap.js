import React from 'react';
import { CacheProvider, ThemeProvider } from "@emotion/react";
import { createRoot } from "react-dom/client";
import CssBaseline from '@mui/material/CssBaseline';

import App from "./App";
import cache from "./emotionCache";
import theme from "./theme";
import { federationConfig } from './federationConfig';
import { init } from '@module-federation/enhanced/runtime';

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

const mount = async (el) => {
  await init(federationConfig());
  createRoot(el).render(<AppShell />);
};

const rootEl = document.getElementById("shell-root");
if (rootEl) {
  mount(rootEl);
}
