const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  output: {
    publicPath: 'http://localhost:3000/',
    uniqueName: 'shell',
  },
  optimization: {
    runtimeChunk: false,
  },
  plugins: [
    new ModuleFederationPlugin({
      shared: {
        '@angular/core': { eager: true, singleton: true },
        '@angular/common': { eager: true, singleton: true },
        '@angular/router': { eager: true, singleton: true },
      },
    }),
  ],
};
