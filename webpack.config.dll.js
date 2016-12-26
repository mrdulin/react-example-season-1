const webpack = require('webpack');
const path = require('path');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');

module.exports = {
	entry: {
		react_libs: [
			'react',
			'react-dom',
			'react-router',
			'react-redux',
			'redux',
			'redux-logger',
			'redux-thunk',
			'redux-saga',
			'react-intl'
		]
	},
	resolve: {
        root: __dirname,
        modulesDirectories: ["node_modules"]
    },
	output: {
		path: path.join(__dirname, 'dll'),
		filename: '[name].dll.js',
		library: '[name]',
	},
	plugins: [
		new cleanWebpackPlugin('dll', {
			root: __dirname,
			verbose: true,
			dry: false
		}),
		new webpack.DllPlugin({
			path: path.join(__dirname, 'dll', '[name].manifest.json'),
			name: '[name]',
			context: __dirname
		}),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),
		new AssetsPlugin({
			filename: 'dll.json',
        	path: path.join(__dirname, 'dll')
		}),
		new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})
	]
};

