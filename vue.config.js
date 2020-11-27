module.exports = {
  devServer: {
    proxy: {
      "/users": {
        // 对 /users/create 的请求也会代理到 3000 端口
        target: "http://127.0.0.1:3000"
      }
    }
  }
};
