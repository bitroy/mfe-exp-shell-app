const { ModuleFederationPlugin } = require("@module-federation/enhanced");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const Dotenv = require("dotenv-webpack");
const pkg = require("./package.json");

module.exports = {
	entry: "./src/index.js",
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env", "@babel/preset-react"],
						cacheDirectory: false,
					},
				},
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "public", "index.html"),
			inject: "body",
			minify: false,
			remoteAppContainerURL: process.env.REMOTE_APP_CONTAINER_URL,
		}),
		new Dotenv({
			path: `./.env.${process.env.NODE_ENV}`,
			safe: false,
		}),
		new ModuleFederationPlugin({
			name: "shellApp",
			remotes: {},
			shared: {
				react: {
					singleton: true,
					requiredVersion: pkg.dependencies["react"],
				},
				"react-dom": {
					singleton: true,
					requiredVersion: pkg.dependencies["react-dom"],
				},
			},
		}),
	],
	resolve: { extensions: [".js", ".jsx"] },
};
