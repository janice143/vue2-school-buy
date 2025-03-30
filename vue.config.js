const { defineConfig } = require('@vue/cli-service');
const defaultSettings = require('./src/settings.js');
const name = defaultSettings.title; // page title
const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭ESLINT校验工具
  // lintOnSave: false,
  //配置代理跨域
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        // target: "http://0.0.0.0:3000;",
      },
    },
  },
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = name;
      return args;
    }),
      // set svg-sprite-loader
      config.module.rule('svg').exclude.add(resolve('src/icons')).end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end();
  },
});
