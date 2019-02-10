const path = require("path")
const autoprefixer = require("autoprefixer")
const cssnano = require("cssnano")
const webpack = require("webpack")

module.exports = env => {
	const isProduction = Boolean(env && env.production)
	console.log('Production: ', isProduction)

	return {
		mode: isProduction ? 'production' : 'development',
		devtool: isProduction ? 'source-map' : 'inline-source-map',
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
		},
		resolve: {
			extensions: [
				'.ts', '.tsx', '.js', '.json'
			],
		},
		plugins: [
			new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
		]
	}
}
