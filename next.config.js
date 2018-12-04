const path = require('path');
require('dotenv').config();
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const commonsChunkConfig = require('@zeit/next-css/commons-chunk-config');
const webpack = require('webpack');
const dev = process.env.NODE_ENV !== 'production';

const extractCSSPlugin = new ExtractTextPlugin({
  filename: 'static/style.css'
});

module.exports = {
  assetPrefix: dev ? '/' : '/gameday/',
  webpack(config, { dev }) {
    config.plugins.push(extractCSSPlugin);
    config.plugins.push(
      new webpack.EnvironmentPlugin(process.env)
    );
    
    config.module.rules.push({
      test: /\.(css|scss)$/,
      rules: [
        // Process external/third-party styles
        {
          exclude: [path.resolve(__dirname, 'components'), path.resolve(__dirname, 'pages')],
          use: extractCSSPlugin.extract(
            [
              {
                loader: 'css-loader',
                options: {
                  sourceMap: dev,
                },
              },
              'sass-loader'
            ]
          ),
        },
      
        // Process internal/project styles (from src folder)
        {
          include: [path.resolve(__dirname, 'components'), path.resolve(__dirname, 'pages')],
          use: extractCSSPlugin.extract(
            [
              {
                loader: 'css-loader',
                options: {
                  // CSS Loader https://github.com/webpack/css-loader
                  importLoaders: 1,
                  sourceMap: dev,
                  // CSS Modules https://github.com/css-modules/css-modules
                  modules: true,
                  localIdentName: dev
                    ? '[name]-[local]-[hash:base64:5]'
                    : '[hash:base64:5]',
                },
              },
              'sass-loader'
            ],
          )
        },
      ],
    });
    
    return config;
  }
};