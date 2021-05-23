const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  output: {
    publicPath: 'http://localhost:6002/',
    uniqueName: 'bar-microapp',
  },
  optimization: {
    runtimeChunk: false,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'microappBar',
      library: { type: 'var', name: 'microappBar' },
      filename: 'bar-microapp.js',
      exposes: {
        BarModule: './apps/app-bar/src/app/bar/bar.module.ts',
      },
      shared: {
        'libs/shared-core-services/src/index': {
          singleton: true,
        },
        '@angular/core': { eager: true, singleton: true },
        '@angular/common': { eager: true, singleton: true },
        '@angular/router': { eager: true, singleton: true },
      },
    }),
  ],
};
