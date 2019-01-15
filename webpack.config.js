const path = require("path")
const autoprefixer = require("autoprefixer")
const cssnano = require("cssnano")
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = env => {
	const isProduction = Boolean(env && env.production)
	console.log('Production: ', isProduction)

	return {
		mode: isProduction ? 'production' : 'development',
		devtool: isProduction ? 'source-map' : 'inline-source-map',
		entry: path.resolve(__dirname, "src/index.js"),
		output: {
			path: path.resolve(__dirname, "dist"),
			filename: 'bundle.js'
		},
		plugins: [
			new VueLoaderPlugin(),
			new CopyWebpackPlugin([
				{
					from: 'src/fom.html'
				},
				{
					from: 'src/api.php',
				},
				{
					from: 'src/auth.php'
				}
			])
		],
		module: {
			rules: [
				{
					test: /\.vue$/,
					loader: 'vue-loader'
				},
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel-loader'
				},
				{
					test: /\.css$/,
					use: [
						'vue-style-loader',
						{
							loader: 'css-loader',
							options: {
								sourceMap: !isProduction
							}
						},
					]
				},
				{
					test: /\.scss$/,
					use: [
						'vue-style-loader',
						{
							loader: 'css-loader',
							options: {
								importLoaders: 2,
								sourceMap: !isProduction
							}
						},
						{
							loader: 'postcss-loader',
							options: {
								sourceMap: !isProduction,
								plugins: [
									cssnano({preset: 'default'}),
									autoprefixer({grid: true})
								]
							  }
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: !isProduction
							}
						}
					]
				},
				{
					test: /\.svg$/,
					loader: 'file-loader',
					options: {
						outputPath: 'assets/'
					}
				},
				{
					test:  /\.(png|jpg|gif)$/,
					loader: 'file-loader',
					options: {
						outputPath: 'assets/'
					}
				}
			]
		}
	}
}