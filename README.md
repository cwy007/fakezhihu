# fakezhihu

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 模拟数据

* https://www.zhihu.com/api/v3/feed/topstory/recommend?session_token=27dc057ceb1e5b856292cbb7e1aa706e&desktop=true&page_number=3&limit=6&action=down&after_id=1
* [富文本编辑器](https://www.npmjs.com/package/vue-quill-editor)

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
