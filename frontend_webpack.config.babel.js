import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import {NamedModulesPlugin} from 'webpack';

const prod = process.argv.indexOf('-p') !== -1;

export default {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      },
      {
        test: /\.(eot|ttf|woff)$/,
        loader: 'url-loader',
      },
      {
        test: /\.md$/,
        loader: 'json-loader!./src/helpers/markdown_loader.js',
      },
      {
        test: /\.s?css$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader!sass-loader',
        })
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader!image-webpack-loader'
      }
    ],
  },
  plugins: [
    new NamedModulesPlugin(),
    new ExtractTextPlugin('app.css'),
    new CompressionPlugin()
  ],
  node: {
    fs: 'empty', // so that babel doesn't blow up with weird error messages occasionally
  },
  devtool: prod ? false : 'inline-source-map'
};