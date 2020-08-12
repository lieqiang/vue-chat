const path = require("path") //引入path模块
function resolve(dir){
  return path.join(__dirname, dir)//path.join(__dirname)设置绝对路径
}

module.exports={
    devServer: {
      open: true, //是否自动弹出浏览器页面
      host: "localhost", 
      // port: '8089',
      https: false,
      hotOnly: false, 
      proxy: {
        '/': {
          target: 'http://localhost:8090/v1', //API服务器的地址
          ws: true,  //代理websockets
          changeOrigin: true, // 虚拟的站点需要更管origin
          pathRewrite: {   //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
            '^/api': ''
          }
        }
      },
  },
  chainWebpack:(config) => {
    config.resolve.alias.set("@",resolve("./src")), // 别名
    config.module
    .rule('svg')
    .uses.clear()
    config.module
    .rule('svg1')
    .test(/\.svg$/)
    .use('svg-sprite')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
    .include
      .add(resolve('src/icons'))
      .end()

  }
}