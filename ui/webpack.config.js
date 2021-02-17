const path = require('path');
const { version } = require('./package.json');
const webpack = require('webpack');

module.exports = env => {
  return {
    entry: '/src/index.jsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: `bundle-v${version}.js`,
      library: 'Board',
      libraryTarget: 'umd',
      umdNamedDefine: true
    },
    resolve: {
      extensions: ['.js', '.jsx']
    },
    plugins: [
      new webpack.DefinePlugin({
        'build.env': {
          API_URL: JSON.stringify(env.API_URL)
        }
      })
    ],
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: ['babel-loader'],
          exclude: /node_modules/
        },
        {
          test: /\.(scss|css)$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        }
      ]
    }
  };
};
