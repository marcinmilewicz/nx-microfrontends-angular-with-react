const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  output: {
    publicPath: 'http://localhost:6003/',
    uniqueName: 'foo-microapp',
  },
  optimization: {
    runtimeChunk: false,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'microappFoo',
      library: { type: 'var', name: 'microappFoo' },
      filename: 'foo-microapp.js',
      exposes: {
        FooModule: './apps/app-foo/src/app/app-foo/foo.module.ts',
      },
      shared: {
        '@angular/core': { eager: true, singleton: true },
        '@angular/common': { eager: true, singleton: true },
        '@angular/router': { eager: true, singleton: true },
        'libs/shared-core-services/src/index': {
          singleton: true,
        },
      },
    }),
  ],
};
