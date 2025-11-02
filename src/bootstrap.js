import React from 'react';
import { CacheProvider, ThemeProvider } from "@emotion/react";
import { registerRemotes } from "@module-federation/enhanced/runtime";
import { createRoot } from "react-dom/client";
import CssBaseline from '@mui/material/CssBaseline';

import App from "./App";
import cache from "./emotionCache";
import theme from "./theme";
import { federationConfig } from './federationConfig';

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
  const config = federationConfig();
  if (config.remotes) {
    registerRemotes(config.remotes);
  }
  createRoot(el).render(<AppShell />);
};

const rootEl = document.getElementById("shell-root");
if (rootEl) {
  mount(rootEl);
}
