const path = require("path");//引入path模块
function resolve(dir){
    return path.join(__dirname,dir)//path.join(__dirname)设置绝对路径
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
            target: 'http://localhost:8090', //API服务器的地址
            ws: true,  //代理websockets
            changeOrigin: true, // 虚拟的站点需要更管origin
            pathRewrite: {   //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
              '^/api': ''
            }
          }
      },
  },
  chainWebpack:(config)=>{
    config.resolve.alias
    //set第一个参数：设置的别名，第二个参数：设置的路径
    .set("@",resolve("./src"))
    // .set("components",resolve("./src/components"))
    // .set("assets",resolve("./src/assets"))
    // .set("views",resolve("./src/views"))
    // .set("network",resolve("./src/network"))
    //注意 store 和 router 没必要配置
  }
}