const webpack = require('webpack')
const path = require('path')

const defaultConfig = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.otf$/],
        loader: require.resolve('url-loader'),
        options: {
          // limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.ttf$/,
        loader: 'url-loader', // or directly file-loader
        include: path.resolve(
          __dirname,
          'node_modules/react-native-vector-icons'
        ),
      },
    ],
  },
  externals: {
    react: 'React',
    'react-native': 'ReactNative',
  },
  resolve: {
    modules: ['node_modules'],
    extensions: [
      '.web.js',
      '.js',
      '.json',
      '.web.jsx',
      '.jsx',
      '.web.react.js',
      '.react.js',
    ],
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
}

module.exports = defaultConfig
