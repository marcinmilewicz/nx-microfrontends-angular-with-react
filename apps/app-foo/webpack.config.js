const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  output: {
    publicPath: 'http://localhost:6003/',
    uniqueName: 'fooMicroapp',
  },
  devServer: {
    liveReload: false,
    hot: false,
  },
  optimization: {
    runtimeChunk: false,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'foo',
      library: { type: 'var', name: 'foo' },
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
