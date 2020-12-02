const openInEditor = require("launch-editor-middleware");

module.exports = {
  devServer: {
    // 跨域处理
    proxy: {
      "/users": {
        // 对 /users/create 的请求也会代理到 3000 端口
        target: "http://127.0.0.1:3000"
      },
      // 这个代理导致 http://localhost:8080/people/4/articles 页面刷新时报错 404
      "^/articles": {
        // ^ 在这里表示以什么开头
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
      },
      "/hot-list-web": {
        target: "https://www.zhihu.com/api/v3/feed/topstory/"
      }
    },
    before(app) {
      /* 编辑器类型 webstorm code */
      app.use("/__open-in-editor", openInEditor("code"));
    }
  }
};
