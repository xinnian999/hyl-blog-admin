const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    port: 8090,
    open: true,
    host: "localhost",
    proxy: {
      "/api": {
        //表示匹配所有以'/tree'开头的请求路径
        target: "https://www.hyl999.co:7777", //代理目标的服务器的基础路径
        pathRewrite: { "^/api": "" }, //重写代理服务器的路径不然访问不到代理目标的服务器
        ws: true, //用于支持websocket
        changeOrigin: true, //用于控制请求头中host的值
      },
    },
  },
  outputDir: "dist",
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "心念blog后台管理";
      return args;
    });
  },
});
