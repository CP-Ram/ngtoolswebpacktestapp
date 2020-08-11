/* <project-root>/webpack.config.worker.js */

const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const { NoEmitOnErrorsPlugin } = require('webpack');
const { AngularCompilerPlugin } = require('@ngtools/webpack')

module.exports = {
  'mode': 'production',
  'devtool': 'none',
  'resolve': {
    'extensions': [
      '.ts',
      '.js'
    ],
    'modules': [
      './node_modules'
    ]
  },
  'resolveLoader': {
    'modules': [
      './node_modules'
    ]
  },
  'entry': {
    './src/appResourceFiles/workers/httpWebWorker': [
      './src/webWorker/main.worker.ts'
    ]
  },
  'output': {
    'path': process.cwd(),
    'filename': '[name].js'
  },
  'watch': false,
  'module': {
    'rules': [
      {
        'enforce': 'pre',
        'test': /\.js$/,
        'loader': 'source-map-loader',
        'exclude': [
          /\/node_modules\//
        ]
      },
      {
        'test': /\.json$/,
        'loader': 'json-loader'
      },
      {
        'test': /\.ts$/,
        'loader': '@ngtools/webpack'
      }
    ]
  },
  'plugins': [
    new NoEmitOnErrorsPlugin(),
    new ProgressPlugin(),
    new AngularCompilerPlugin({
      'tsConfigPath': './tsconfig.worker.json',
      'entryModule': './src/webWorker/main.worker.ts'
    })
  ]
};
