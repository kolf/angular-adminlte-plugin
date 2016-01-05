var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    vendor: [
      'jquery/dist/jquery',
      'admin-lte/bootstrap/js/bootstrap',
      'admin-lte/dist/js/app'
    ],
    ng: [
      'angular/angular'
    ],
    app: [
      'main',
      'script/controllers/rootCtrl'
    ]
  },
  output: {
    filename: '[name].js',
    path: './dest'
  },
  module: {
    loaders: [
      {test: /\.css$/, loader: 'style-loader!css-loader'},
      {test: /\.(eot|woff|ttf|svg|woff2)$/, loader: "file-loader" },
      {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
      // {test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader')},
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({$: "jquery", jQuery: "jquery", "window.jQuery": "jquery"}),
    new ExtractTextPlugin('[name].css', {allChunks: true}),
    new HtmlWebpackPlugin({
      template: path.resolve('src', 'index.html'),
      inject: 'body'
    })
  ],
  resolve: {
    extensions: ['', '.js', '.json', '.coffee'],
    modulesDirectories: ['node_modules', 'src']
  },
  devtool: 'eval-source-map',
  devServer: {
    port: 8888,
    historyApiFallback: true,
    stats: {
      chunkModules: false,
      colors: true
    },
    contentBase: './src'
  }
};
