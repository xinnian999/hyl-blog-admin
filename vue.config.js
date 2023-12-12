const { defineConfig } = require("@vue/cli-service");
const path = require("path");

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    client: { overlay: false },
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
      "/cdn": {
        //表示匹配所有以'/tree'开头的请求路径
        target: "https://cdn.hyl999.co/public", //代理目标的服务器的基础路径
        pathRewrite: { "^/cdn": "" }, //重写代理服务器的路径不然访问不到代理目标的服务器
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
    // 内置的svg处理排除指定目录下的文件
    config.module
      .rule("svg")
      .exclude.add(path.resolve("src/assets/icons"))
      .end();

    config.module
      .rule("svg-sprite-loader")
      .test(/\.svg$/)
      .include.add(path.resolve("src/assets/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      });
  },
});
