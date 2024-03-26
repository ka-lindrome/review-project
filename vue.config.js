const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'] // 添加 TypeScript 文件后缀支持
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader', // 使用 ts-loader 处理 TypeScript 文件
          exclude: /node_modules/
        }
      ]
    }
  }
});
