
var LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
  entry: './src/app.js',
  output: {
    path: './',
    filename: 'bundle.js'
  },
  plugins: [
     new LiveReloadPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: { presets: [ 'es2015', 'react' ] }
      }
    ]
  }
};
