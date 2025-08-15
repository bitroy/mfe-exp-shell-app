const { ModuleFederationPlugin } = require("webpack").container;
const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const path = require("path");
const { getRemotes } = require("./config/remote");

module.exports = merge(common, {
	mode: "development",
	devServer: {
		port: 3000,
		historyApiFallback: true,
		hot: true,
	},
	devtool: "eval-source-map",
	plugins: [
		new ModuleFederationPlugin({
			name: "shellApp",
			remotes: getRemotes(true),
			shared: {
				react: { singleton: true, requiredVersion: false },
				"react-dom": { singleton: true, requiredVersion: false },
			},
		}),
	],
});
