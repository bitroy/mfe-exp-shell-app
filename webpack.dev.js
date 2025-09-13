const { ModuleFederationPlugin } = require("@module-federation/enhanced");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");

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
			remotes: {},
			shared: {
				react: { singleton: true, requiredVersion: false },
				"react-dom": { singleton: true, requiredVersion: false },
			},
		}),
	],
});
