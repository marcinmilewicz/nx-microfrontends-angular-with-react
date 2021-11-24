const { ModuleFederationPlugin } = require('webpack').container;
const nrwlConfig = require('@nrwl/react/plugins/webpack');

module.exports = (config) => {
  config = nrwlConfig(config);
  config.output = {
    publicPath: 'http://localhost:6001/',
    uniqueName: 'headerMicroappaa',
  };

  config.optimization = {
    ...config.optimization,
    runtimeChunk: false,
  };

  config.plugins.push(
    new ModuleFederationPlugin({
      name: 'microappHeader',
      library: { type: 'var', name: 'microappHeader' },
      filename: 'header-microapp.js',
      exposes: {
        Header: './src/app/Header.tsx',
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
      },
    })
  );
  return config;
  // return {
  //   ,
  //   mode: 'development',
  //   output: {
  //     publicPath: 'http://localhost:6001/',
  //     uniqueName: 'app-2header',
  //   },
  //   optimization: {
  //     runtimeChunk: false,
  //   },
  // module: {
  //   ...config.module,
  //   rules: [
  //     ...config.module.rules,
  //     {
  //       test: /\.tsx?$/,
  //       loader: 'babel-loader',
  //       exclude: /node_modules/,
  //       options: {
  //         presets: ['@babel/preset-react'],
  //         plugins: [
  //           '@babel/plugin-transform-typescript',
  //           '@babel/plugin-syntax-jsx',
  //         ],
  //       },
  //     },
  //   ],
  // },
};
