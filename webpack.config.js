const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const pkg = require('./package.json');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const __PROD__ = process.env.NODE_ENV === 'production';
const __DEV__ = __PROD__ === false;
const env = __PROD__ ? 'production' : 'development';

console.log('========================================================');
console.log('WEBPACK NODE_ENV :: ', JSON.stringify(env));
console.log('========================================================');

const dist = path.resolve(__dirname, __PROD__ ? 'docs' : 'dist');
const src = path.resolve(__dirname, 'src');

const getNodeModulePath = (nodeModulePath, symbol = '.') => {
  const filePath = path.dirname(nodeModulePath);
  const filename = path.basename(nodeModulePath, '.js');
  const ext = path.extname(filename);

  return path.resolve(__dirname, './node_modules/', __DEV__ ? nodeModulePath : (filePath + '/' + filename + symbol + 'min' + ext));
}

//史上巨坑，'/'和'./'是不同的，publicPath只能使用绝对路径
//webpack result is served from /./dist ，可见路径是错误的
//publicPath将添加在index.html的bundle.js,bundle.css和所有静态资源文件路径前
//例如：开发中：background-image: url(../../../images/adorable-avatar-bg.jpg);
//打包编译后：在dist目录下得images目录下
//部署后：http://novaline.space/react-examples/images/adorable-avatar-bg.jpg
const publicPath = __PROD__ ? `http://novaline.space/${pkg.name}/` : '/';

const config = {
  PORT: 3000,

  entry: {
    app: path.join(src, 'index.js')
  },

  output: {
    path: dist,
    filename: __DEV__ ? '[name].js' : '[name].[chunkhash:8].js',
    publicPath,
    pathinfo: __DEV__
  },

  module: {
    noParse: [],
    loaders: [{
      test: /\.(js|jsx)?$/,
      exclude: /(node_modules|bower_components)/,
      include: src,
      loader: 'babel'
    }, {
      test: /\.(scss|sass)$/,
      exclude: /node_modules/,
      loader: ExtractTextPlugin.extract(
        'style',
        'css?sourceMap?modules&localIdentName=[name]__[local]-[hash:base64:5]!sass'
      )
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'file',
      query: {
        name: '[path][name].[ext]',
        context: './src'
      }
    }]
  },

  sassLoader: {
    includePaths: ['src/pages'],
    sourceMap: true
  },

  resolve: {
    root: __dirname,
    extensions: ['', '.js', '.jsx', '.scss', '.sass', '.css', '.json'],
    alias: {
      images: path.resolve(src, 'images'),
      pages: path.resolve(src, 'pages'),
      actions: path.resolve(src, 'actions')
    },
    modulesDirectories: ["node_modules", 'src']
  },

  devtool: 'source-map',

  plugins: [
    new HtmlWebpackPlugin({
      template: src + '/index.html',
      filename: 'index.html'
      // dll: require('./dll/dll.json').react_libs.js
    }),
    new webpack.DefinePlugin({
      __DEV__: __DEV__,
      __PROD__: __PROD__,
      'process.env': {
        'NODE_ENV': JSON.stringify(env)
      },
      __VERSION__: JSON.stringify(pkg.version),
      __TITLE__: JSON.stringify(pkg.description)
    }),
    new ExtractTextPlugin('[name].[contenthash:8].css', {
      allChunks: true
    }),
    // new webpack.DllReferencePlugin({
    // 	context: __dirname,
    // 	manifest: require('./dll/react_libs.manifest.json')
    // }),
    new CopyWebpackPlugin([
      {from: 'dll', to: 'dll'}
    ], {
      ignore: ['*.json']
    }),
    new webpack.ProvidePlugin({
      util: src + '/common/js/util',
      actions: src + '/actions'
    }),
    // new webpack.optimize.CommonsChunkPlugin("commons", "commons.js", Infinity),
    new CleanWebpackPlugin(['dist', 'docs'])
  ],

  addNoParse: (noParseMap) => {
    if (noParseMap.keys().length === 0) return;
    for (let [name, path] of noParseMap.entries()) {
      const filepath = getNodeModulePath(path);
      config.resolve.alias[name] = filepath;
      config.module.noParse.push(filepath);
    }
  }

};

// config.addNoParse(new Map([
// 	['react', 'react/dist/react.js'],
// 	//react-redux依赖react，因此不能使用noParse
// 	// ['react-redux', 'react-redux/dist/react-redux.js'],
// 	['redux', 'redux/dist/redux.js'],
// 	['redux-logger', 'redux-logger/dist/index.js'],
// 	['redux-thunk', 'redux-thunk/dist/redux-thunk.js']
// ]));

// console.log(config.module.noParse)

if (__DEV__) {
  // webpack-dev-server 的cli 的--hot会添加HotModuleReplacementPlugin，所以不要重复添加。
  // config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.devServer = {
    contentBase: './',
    historyApiFallback: true,
    colors: true,
    port: config.PORT,
    progress: true,
    host: '0.0.0.0',
    stats: {
      chunks: false
    }
  };
}

if (__PROD__) {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        dead_code: true,
        drop_debugger: true,
        booleans: true,
        loops: true,
        unused: true
      },
      mangle: true
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin()
  );
}
module.exports = config;
