// This file is a placeholder if you decide to use Webpack instead of Vite.
// The project is currently configured to use vite.config.js.
module.exports = {
  // Example Webpack configuration
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
};