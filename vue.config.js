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
      '/adminserver': {
        target: 'http://localhost:3030',
        // target: 'http://192.168.1.234:3402',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/adminserver': '/'
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
