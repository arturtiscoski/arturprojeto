/*eslint-env node*/
const path = require('path')
const buildConfig = require('./build/config')
const LiveReloadPlugin = require('webpack-livereload-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['whatwg-fetch', path.join(__dirname, 'ui/app/index.jsx')],
  cache: true,
  output: {
    path: path.join(__dirname, 'target/classes/static'),
    filename: 'bundle.js',
    chunkFilename: '[name].chunk.js'
  },
  watch: true,
  devtool: 'eval',
  module: {
    rules: [{
        test: /\.jsx?$/,
        exclude: /(attr-accept)/,
        use: [
          {
            loader: "babel-loader",
            query: {
              presets: ['env', 'react'],
              plugins: [
                "transform-object-rest-spread",
                ["import", { libraryName: "antd", style: true }]
              ]
            }
          },
          "eslint-loader"
        ]
      },
      {
        test: /\.css$/,
        exclude: [path.resolve(__dirname, 'node_modules/font-awesome/css/font-awesome.css')],
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader",
          query: {
            modules: true,
            localIdentName: '[name]__[local]___[hash:base64:5]'
          }
        }]
      },
      {
        test: /node_modules[\\\/]font-awesome[\\\/]css[\\\/]font-awesome\.css/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader",
        }]
      },
      {
        test: /\.less$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader"
        }, {
          loader: "less-loader", 
          query: buildConfig.antDesign
        }]
      },
      { 
        test: /\.(png|jpg|jpeg|svg)$/,
        use: [
          {
            loader: 'file-loader',
          },
          {
            loader: 'image-webpack-loader',
            options: buildConfig.imageLoader,
          },
        ],
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      }
    ] 
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new LiveReloadPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'ui/app/index.html')
    })
  ]
}