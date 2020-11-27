import http from "http";
import https from "https";

export default {
  // 自定义的请求头
  headers: {
    post: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    },
    "Content-Type": "application/json;charset=UTF-8",
    "X-Requested-With": "fetch"
  },
  // 超时设置
  timeout: 10000,
  // 跨域是否带Token
  // withCredentials: true,
  // 响应的数据格式 json / blob /document /arraybuffer / text / stream
  // responseType: 'json',
  // 用于node.js
  httpAgent: new http.Agent({
    keepAlive: true
  }),
  httpsAgent: new https.Agent({
    keepAlive: true
  })
};
