/* eslint-disable */
export const getCookies = (argName) => {                      //  获取cookie方法
  const name = `${argName}=`;                                 //  拼接参数字符串
  const arr = document.cookie.split(';');                     //  分割cookies为数组
  for (let i = 0; i < arr.length; i += 1) {                   //  循环cookie数组
    let item = arr[i];                                        //  选取数组中一个元素
    while (item.charAt(0) === ' ') item = item.substring(1);  //  若第一位为空，则去掉空格
    //  判断当前元素中是否含有参数，若有，返回等于号后面的内容
    // 解决 id 和 user_id 取值问题
    if (item.match(new RegExp(`^${name}`))) {
      return decodeURIComponent(item.substring(name.length, item.length));
    }
  }
  return '';
};

export const a = 123;
