module.exports = {
  devServer: {
    proxy: {
      "/users": {
        target: "http://127.0.0.1:3000"
      },
      "/users/create": {
        target: "http://127.0.0.1:3000"
      }
    }
  }
};
