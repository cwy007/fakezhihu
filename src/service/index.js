import axios from 'axios';
import config from './config';

// 判断是路由跳转还是 axios 请求
if (process.server) {
  config.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`;
}

const service = axios.create(config);

// 返回处理结果
service.interceptors.response.use(
  (res) => {
    const x = {};
    x.data = res.data;
    x.status = res.status;
    x.statusText = res.statusText;
    return x;
  },
  (error) => { Promise.reject(error) }
)

export default {
  post(url, data) {
    return service({
      method: 'post',
      url,
      data
    });
  },
  put(url, data) {
    return service({
      method: 'put',
      url,
      data
    });
  },
  get(url, data) {
    return service({
      method: 'get',
      url,
      params: data
    });
  },
  delete(url, data) {
    return service({
      method: 'delete',
      url,
      ...data
    });
  }
};
