const path = require("path")
const autoprefixer = require("autoprefixer")
const cssnano = require("cssnano")
const webpack = require("webpack")
const CompressionPlugin = require('compression-webpack-plugin')




module.exports = env => {
	const isProduction = Boolean(env && env.production)
	console.log('Production: ', isProduction)

	const plugins = [
		new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
		new webpack.DefinePlugin({
			IS_PRODUCTION: isProduction,
		})
	]
	if(isProduction){
		plugins.push(new CompressionPlugin())
	}

	return {
		mode: isProduction ? 'production' : 'development',
		devtool: isProduction ? false : 'inline-source-map',
		entry: path.resolve(__dirname, "src/index.tsx"),
		output: {
			path: path.resolve(__dirname, "public/static"),
			filename: 'bundle.js'
		},
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					loader: 'ts-loader',
					exclude: /node_modules/
				},
				{
					test: /\.scss$/,
					use: [
						'style-loader',
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
						outputPath: 'assets/',
						publicPath: 'static/assets/'
					}
				},
				{
					test:  /\.(png|jpg|gif)$/,
					loader: 'file-loader',
					options: {
						outputPath: 'assets/',
						publicPath: isProduction ? '~fairyski/static/assets/' : 'static/assets/'
					}
				}
			]
		},
		resolve: {
			extensions: [
				'.ts', '.tsx', '.js', '.json'
			],
		},
		plugins: plugins
	}
}
