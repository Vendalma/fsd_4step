const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const RemovePlugin = require('remove-files-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist'),
  assets: 'assets/',
};

const plugins = [
  new MiniCssExtractPlugin({
    filename: `${PATHS.assets}css/[name].min.css`,
  }),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './src/index.pug',
  }),
  new CopyWebpackPlugin({
    patterns: [
      {
        from: `${PATHS.src}/${PATHS.assets}favicon`,
        to: `${PATHS.assets}favicon`,
      },
    ],
  }),
  new RemovePlugin({
    before: {
      include: [
        './dist'
    ]
    }
  })
]

isDev && plugins.push(
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
  }),
);

const config = {
  mode: isDev? 'development' : 'production',
  entry: {
    main: [`${PATHS.src}/index.ts`, `${PATHS.src}/index.scss`],
    slider: [`${PATHS.src}/slider/jquerySlider/slider.ts`, `${PATHS.src}/slider/styles.scss`],
  },

  output: {
    path: PATHS.dist,
    filename: `${PATHS.assets}js/[name].min.js`,
  },
  devtool: isDev && 'inline-source-map',
  devServer: {
    contentBase: PATHS.dist,
    compress: true,
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.ts$/,
        exclude: [path.resolve('src/test/')],
        enforce: 'post',
        use: {
          loader: 'istanbul-instrumenter-loader',
          options: { esModules: true },
        },
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../../',
            },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDev,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: isDev,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
          name: '[name].pug',
        },
      },
      {
        test: /\.(svg|png|jpe?g|gif)$/,
        loader: 'file-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: plugins
};

module.exports = config;
