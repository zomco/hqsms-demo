// Vue.config.js
module.exports = {
  // 选项
  // 基本路径
  publicPath: './',
  // 构建输出路径
  outputDir: 'dist',
  // 放置静态资源目录
  assetsDir: 'static',
  // html的输出路径
  indexPath: 'index.html',
  // 文件名哈希
  filenameHashing: true,
  // 是否在保存的时候使用`eslint-loader`进行检查
  lintOnSave: false,
  // 是否使用带浏览器内编译器的完整构建版本
  runtimeCompiler: false,
  // 配置webpack-dev-server行为
  devServer: {
    open: true,
    proxy: {
      '/api': {
        target: 'http://47.115.144.65/api/',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/foo': {
        target: '<other_url>'
      }
    }
  }
}
