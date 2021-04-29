const path = require('path')

const resolve = dir => path.join(__dirname, dir)

// const BASE_URL = process.env.NODE_ENV === 'protection' ? '/' : '/'

module.exports = {
  lintOnSave: false,//关闭esline的自动校验功能
  runtimeCompiler: true,

  productionSourceMap:false,//去除打包后的map文件，减少体积


  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))//表示之后我们可以用@代替src文件夹来快捷使用
      .set('_C', resolve('src/components'))
    
     // 压缩代码
     config.optimization.minimize(true)
     // 分割代码
     config.optimization.splitChunks({
       chunks: 'all'
     })
     
    // //  关闭预加载
    //  config.plugins.delete('preload') 
    //  config.plugins.delete('prefetch')  

    // 用cdn方式引入
    config.externals({
      'vue': 'Vue',
      'vuex': 'Vuex',
      'vue-router': 'VueRouter',
      'axios': 'axios',
      'element-ui': 'ELEMENT'
    })
    
  },

  // 输出文件目录
  outputDir: 'dist',
  // webpack-dev-server 相关配置

  assetsDir: 'static',//静态资源目录(js,css,img,fonts)
  publicPath: '/', // 设置打包文件相对路径

  devServer: {
    port: "8080",
    proxy: {
      '/api1': {
        target: "https://api.66mz8.com/api/translation.php",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api1': ''
        }
      },
      '/api2': {
        target: "https://restapi.amap.com/v3",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api2': ''
        }
      },
      '/api3': {
        target: "http://zengyuebaba.eicp.vip",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api3': ''
        }
      }
      //这个代理地址不能为空
    }
  }

}
