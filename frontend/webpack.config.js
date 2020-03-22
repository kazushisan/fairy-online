/* eslint-disable */

const path = require('path')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const webpack = require('webpack')
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = env => {
	const isProduction = Boolean(env && env.production)

	const plugins = [new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)]
	if (isProduction) {
		plugins.push(new CompressionPlugin())
	}

	return {
		mode: isProduction ? 'production' : 'development',
		devtool: isProduction ? false : 'eval-source-map',
		entry: path.resolve(__dirname, 'src/index.tsx'),
		output: {
			path: path.resolve(__dirname, '../public_html/static'),
			publicPath: '/~fairyski/static/',
			filename: 'bundle.js',
		},
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					loader: 'ts-loader',
					exclude: /node_modules/,
				},
				{
					test: /\.css$/,
					use: [
						'style-loader',
						{
							loader: 'css-loader',
							options: {
								importLoaders: 1,
								sourceMap: !isProduction,
							},
						},
						{
							loader: 'postcss-loader',
							options: {
								sourceMap: !isProduction,
								plugins: [
									cssnano({ preset: 'default' }),
									autoprefixer(),
								],
							},
						},
					],
				},
				{
					test: /\.(png|jpg|gif|svg)$/,
					loader: 'file-loader',
					options: {
						outputPath: 'assets/',
						publicPath: '/~fairyski/static/assets/',
					},
				},
			],
		},
		resolve: {
			extensions: ['.ts', '.tsx', '.js', '.json'],
		},
		plugins: plugins,
		devServer: {
			contentBase: path.resolve(__dirname, '../public_html'),
			contentBasePublicPath: '/~fairyski',
			compress: true,
			port: 3000,
			historyApiFallback: {
				rewrites: [
					{ from: /^\/\~fairyski/, to: '/~fairyski/index.html' },
				],
			},
			proxy: {
				'/~fairyski/api': 'http://localhost:8000/',
			},
		},
	}
}
