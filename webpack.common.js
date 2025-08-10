const { ModuleFederationPlugin } = require("webpack").container;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const dotenv = require("dotenv");
const webpack = require("webpack");

const envPath =
	process.env.NODE_ENV === "development"
		? "./.env.development"
		: "./.env.production";

dotenv.config({ path: path.resolve(__dirname, envPath) });

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
			{
				test: /\.css$/,
				use: [
					"style-loader",
					"css-loader",
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								config: path.resolve(
									__dirname,
									"postcss.config.js"
								),
							},
						},
					},
				],
			},
		],
	},
	plugins: [
		new ModuleFederationPlugin({
			name: "shellApp",
			remotes: {
				todoApp: `todoApp@${
					process.env.NODE_ENV === "development"
						? process.env.REMOTE_TODO_APP_URL
						: "window.REMOTE_TODO_APP_URL"
				}/remoteEntry.js`,
			},
			shared: ["react", "react-dom"],
		}),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "public", "index.html"),
		}),
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
		}),
	],
	resolve: { extensions: [".js", ".jsx"] },
};
