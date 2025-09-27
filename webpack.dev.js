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
	output: {
		publicPath: "auto",
	},
});
