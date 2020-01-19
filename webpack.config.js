// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
	mode: "production",
	// devtool: "sourcemap",
	devtool: false,
	entry: "./src/index.js",
	output: {
		path: __dirname + "/dist",
		filename: "aws-web-analytics.js",
		chunkFilename: "[name].chunk.js",
		libraryTarget: "umd",
		library: "Charts"
	},
	optimization: {},
	resolve: {
		// Add '.ts' and '.tsx' as a resolvable extension.
		extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
	},
	module: {
		rules: [
			// all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
			{ test: /\.ts$/, loader: "ts-loader" },
			{ test: /\.html?$/, loader: "html-loader" },
			{
				test: /\.s?css$/,
				use: [
					// {
					// 	loader: MiniCssExtractPlugin.loader
					// },
					"style-loader",
					// "postcss-loader",
					// "sass-loader",
					"css-loader"
				]
			},
			// {
			// 	test: /\.(jpg|png|gif|eot|ttf|woff|woff2)$/,
			// 	loader: 'url-loader'
			// },
			// {
			// 	test: /\.svg?$/,
			// 	loader: 'raw-loader'
			// }
		]
	},
	plugins: [
		// new MiniCssExtractPlugin({
		// 	filename: "index.css"
		// }),
		// new HtmlWebpackPlugin({
		// 	template: './src/index.html'
		// })
	],
	devServer: {
		contentBase: "./src",
		historyApiFallback: true,
		disableHostCheck: true
	}
};