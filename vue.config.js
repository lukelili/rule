'use strict'
const path = require('path')
function resolve(dir) { return path.join(__dirname, dir) }
const port = process.env.port || process.env.npm_config_port || 9528 // dev port
module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/admin': {
        target: 'https://www.fastmock.site/mock/59d7586b5f8dc479f8769811c9386d70/admin',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/admin': '/'
        }
      }
    }
  },
  configureWebpack: {
    // 快捷路径配置
    resolve: {
      alias: {
        '@': resolve('src'),
        '@a': resolve('src/api'),
        '@c': resolve('src/components')
      }
    }
  }
}
