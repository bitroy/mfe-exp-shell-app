import pkg from "../package.json";

export const federationConfig = () => ({
  name: "shellApp",
  remotes: [
    {
      name: "appContainer",
      entry: process.env["REMOTE_APP_CONTAINER_URL"],
      type: "manifest",
    },
  ],
  shared: {
    react: {
      version: pkg.dependencies["react"],
      shareConfig: {
        singleton: true,
        requiredVersion: pkg.dependencies["react"],
      },
    },
    "react-dom": {
      version: pkg.dependencies["react-dom"],
      shareConfig: {
        singleton: true,
        requiredVersion: pkg.dependencies["react-dom"],
      },
    },
  },
});
