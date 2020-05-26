// next.config.js
const withOffline = require('next-offline')
const useCss = require('@zeit/next-css')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')

const baseConfig = {
  onDemandEntries: {
    maxInactivePage: 10 * 60 * 1000,
    pagesBufferLength: 10
  }
}
/**
 * Para poder utilizar el css personalizado en archivos separados
 * al componente se debe configurar el nextjs
 */
// fix: prevents error when .css files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.css'] = file => {}
}

module.exports = withOffline(
  useCss({
    ...baseConfig,
    exportPathMap: async function (defaultPathMap) {
      return {
        ...defaultPathMap,
        '/404.html': { page: '/_error' },
        '/': { page: '/' }
      }
    },
    webpack: (config = [], { dev }) => {
      if (dev) {
        return config
      }
      config.plugins.push(
        new SWPrecacheWebpackPlugin({
          minify: true,
          verbose: true,
          staticFileGlobsIgnorePatterns: [/\.next\//],
          runtimeCaching: [
            {
              handler: 'cacheFirst',
              urlPattern: /^https?.*/
            }
          ]
        })
      )
      return config
    }
  })
)
