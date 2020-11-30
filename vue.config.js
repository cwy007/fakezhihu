module.exports = {
  // 跨域处理
  devServer: {
    proxy: {
      "/users": {
        // 对 /users/create 的请求也会代理到 3000 端口
        target: "http://127.0.0.1:3000"
      },
      "/articles": {
        target: "http://127.0.0.1:3000"
      },
      "/imgs": {
        target: "http://127.0.0.1:3000"
      },
      "/questions": {
        target: "http://127.0.0.1:3000"
      },
      "/answers": {
        target: "http://127.0.0.1:3000"
      },
      "/comments": {
        target: "http://127.0.0.1:3000"
      },
      "/status": {
        target: "http://127.0.0.1:3000"
      }
    }
  }
};
