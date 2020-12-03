# fakezhihu

## book

《Vue.js前端开发基础与项目实战》• 郑韩京/编著

![book](https://tva1.sinaimg.cn/large/0081Kckwly1glat46k4lrj309y0dwtby.jpg)

## 本地测试项目

[对应的后端项目](https://github.com/cwy007/fakezhihu-server)

```shell
git clone https://github.com/cwy007/fakezhihu.git
cd fakezhihu
npm install
npm run serve
```

### 项目页面

* 注册和登录
<http://localhost:8080/signup>
![signup](https://tva1.sinaimg.cn/large/0081Kckwly1glassymxe4j30rs0hndx8.jpg)
![login](https://tva1.sinaimg.cn/large/0081Kckwly1glastwzmn8j30rs0ho4g7.jpg)

* 首页
<http://localhost:8080>
![home](https://tva1.sinaimg.cn/large/0081Kckwly1glasvqd0f0j30l10rsq8c.jpg)

* 新建文章
<http://localhost:8080/editor/0>
![new](https://tva1.sinaimg.cn/large/0081Kckwly1glaswt8y0qj30rs08fdgb.jpg)

* 文章详情页
<http://localhost:8080/article/46>

![article](https://tva1.sinaimg.cn/large/0081Kckwly1glasxvv6pwj30rs0qnjw9.jpg)

* 问题详情页
<http://localhost:8080/question/9>
![question](https://tva1.sinaimg.cn/large/0081Kckwly1glasypkwa9j30rs0iun1i.jpg)

* 个人中心
<http://localhost:8080/people/6/>
![person](https://tva1.sinaimg.cn/large/0081Kckwly1glaszbm6h2j30rs0nn7cn.jpg)

## targetType 字段

```js
question 没有 status
// 文章0、问题1、答案2

statuses 表
targetType: {
  0: 'article',
  1: 'question',
  2: 'answer',
  3: 'comment'
}

comments 表
targetType 字段
// article:0, question:1, answer: 2, comment:3
```

## 参考

* https://www.zhihu.com/api/v3/feed/topstory/recommend?session_token=27dc057ceb1e5b856292cbb7e1aa706e&desktop=true&page_number=3&limit=6&action=down&after_id=1
* [富文本编辑器](https://www.npmjs.com/package/vue-quill-editor)
* [Vue Devtools 配置open in editor](https://blog.csdn.net/qq_34707272/article/details/107381490)
* [使用Nginx实现反向代理](https://www.cnblogs.com/jmao/p/9908559.html)
