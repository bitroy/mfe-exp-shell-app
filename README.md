# mfe-exp-shell-app (Shell App)

What this app is
- UI Shell and host. Initializes the Module Federation runtime and loads the App Container (manifest).
- Federation config generator: `src/federationConfig.js`.
- Dynamic loader hook: `src/hooks/useRemoteComponent.js`.

Run in development
1. cd mfe-exp-shell-app
2. npm install
3. Create a `.env.development` (or copy from `.env.example`) and set:
   - `REMOTE_APP_CONTAINER_URL` to the App Container manifest URL (e.g. http://localhost:3001/app-container-mf-manifest.json)
4. npm run dev

- Dev server default port: 3000 (see `webpack.dev.js`).

Production via Docker Compose
1. cd mfe-exp-shell-app
2. npm ci && npm run build
3. docker-compose up --build

- docker-compose: `docker-compose.yml`
- Dockerfile: `Dockerfile`
- Nginx config: `default.conf`

Notes
- Ensure the App Container manifest is reachable at the URL configured in `REMOTE_APP_CONTAINER_URL`.
- Keep React versions aligned across the three apps to avoid runtime mismatches.
