/**
 * Para poder utilizar el css personalizado en archivos separados
 * al componente se debe configurar el nextjs
 */

const useCss = require('@zeit/next-css')
// fix: prevents error when .css files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.css'] = file => {}
}
module.exports = useCss
