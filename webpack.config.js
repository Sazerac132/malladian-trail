const webpack = require('webpack');

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const outputDir = process.env.NODE_ENV === 'production' ? 'build' : 'dev';

let webpackConfig = {
  entry: './src/index.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, outputDir)
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          'css-loader',
          'sass-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'images/[hash].[ext]',
          limit: 25000
        }
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }]
      }
    ]
  },
  resolve: {
    extensions: ['.js']
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'My Data Viewing Webpage',
      template: 'src/index.html',
      inject: false
    }),
    new MiniCssExtractPlugin({
      filename: 'app.css',
      chunkFilename: '[name].css'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ],
  mode: process.env.NODE_ENV
};

if (process.env.NODE_ENV === 'development') {
  webpackConfig = {
    ...webpackConfig,
    watch: true,
    watchOptions: {
      aggregateTimeout: 600,
      ignored: ['node_modules/**/*', 'webpack.config.js', 'babel.config.js', './index.js', 'server/**/*']
    }
  };
}

module.exports = webpackConfig;
