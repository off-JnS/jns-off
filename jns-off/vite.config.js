module.exports = {
  root: './src',
  base: '/',
  build: {
    outDir: '../dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        entryFileNames: 'js/[name].js',
        chunkFileNames: 'js/[name].js',
        assetFileNames: '[ext]/[name].[hash].[ext]',
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  css: {
    preprocessorOptions: {
      css: {
        additionalData: '@import "./src/css/style.css";',
      },
    },
  },
};