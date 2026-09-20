const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    // /api/github is served by the back-end proxy, which is what holds the
    // GitHub token. The browser never receives one.
    proxy: {
      '/api/github': {
        target: process.env.API_PROXY_TARGET || 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});
