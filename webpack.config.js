const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const mm = require('music-metadata');

const buildPath = path.resolve(__dirname, 'docs');

module.exports = {
  mode: 'development',
  entry: './src/index.jsx',
  output: {
    path: buildPath,
    filename: 'bundle.js',
  },
  devtool: 'inline-source-map',

  // Mock for API
  devServer: {
    contentBase: buildPath,
    writeToDisk: true,
    before: (app) => {
      app.get('/tracklist', (req, res) => {
        const soundsDir = path.resolve(buildPath, 'sounds');
        fs.readdir(
          soundsDir,
          (err, files) => {
            if (err) {
              throw err;
            }
            Promise.all(
              files.map(async (file) => {
                const metadata = await mm.parseFile(path.resolve(soundsDir, file));
                return ({
                  path: file,
                  artist: metadata.common.artist,
                  title: metadata.common.title,
                  duration: metadata.format.duration.toFixed(0),
                });
              }),
            ).then((tracks) => {
              res.json({ tracks });
            });
          },
        );
      });
    },
  },
  // end of mock

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss', '.css'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
            plugins: ['transform-es2015-arrow-functions', 'babel-plugin-transform-class-properties'],
          },
        },
        exclude: /node_modules/,
      }, {
        test: /\.s?css$/,
        use: [
          'style-loader', // creates style nodes from JS strings
          'css-loader', // translates CSS into CommonJS
          'sass-loader', // compiles Sass to CSS, using Node Sass by default
        ],
        // }, {
        //   test: /\.(jpe?g|png|gif)$/,
        //   loader: 'file-loader'
      }, {
        test: /\.(svg|eot|woff|ttf)$/,
        loader: 'file-loader',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      verbose: true,
      cleanStaleWebpackAssets: false,
      cleanAfterEveryBuildPatterns: ['main*.js', '*.json'],
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'assets/static/index.html'),
        to: buildPath,
      },
      {
        from: path.resolve(__dirname, 'assets/css'),
        to: buildPath,
      },
      {
        from: path.resolve(__dirname, 'assets/fonts'),
        to: path.resolve(buildPath, 'fonts'),
      },
      {
        from: path.resolve(__dirname, 'assets/sounds'),
        to: path.resolve(buildPath, 'sounds'),
      },
    ]),
  ],
};
