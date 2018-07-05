module.exports = {
  proxy: {
    '/api': {
      target: 'http://elm.cangdu.org',  // 接口域名
      changeOrigin: true,  //是否跨域
      pathRewrite: {
        '^/api': ''   //需要rewrite的,
      }
    }
  }
}
