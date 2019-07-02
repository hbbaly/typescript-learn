# ts-axios

> **使用ts重构axios**

> step1 ：初始化仓库---demo中的simple文件夹）

> step2 ：get的基础请求处理---(demo中的base文件夹)


处理get请求 url 参数
> step3 : post基本请求---(demo中的base文件夹)

- 处理请求 body 数据
- 处理请求 header
- 获取响应数据
- 处理响应 header
- 处理响应 data

> step4: 错误处理

- 处理网络异常错误
- 处理超时错误
- 非 200 状态码
> stepe5: axios一些接口拓展

### 请求方法扩展接口
- axios.request(config)

- axios.get(url[, config])

- axios.delete(url[, config])

- axios.head(url[, config])

- axios.options(url[, config])

- axios.post(url[, data[, config]])

- axios.put(url[, data[, config]])

- axios.patch(url[, data[, config]])

axios 不单单是一个方法，更像是一个混合对象

- 响应数据支持泛型

> step6: axios拦截器实现

- request // 请求拦截器
- response  // 响应拦截器
- eject // 取消拦截器

> stepe7: 合并设置

默认配置`defaults`与自定义配置的合并

- 大部分属性的合并策略：

```ts
function defaultStrat (val1:any, val2: any): any{
  return typeof val2 !== 'undefined' ? val2 : val1
}
```
如果有 val2 则返回 val2，否则返回 val1，也就是如果自定义配置中定义了某个属性，就采用自定义的，否则就用默认配置。

- 对于一些属性如 url、params、data,只接受自定义配置合并策略

```ts
function val2Strat(val1:any, val2: any): any{
  if (typeof val2 !== 'undefined') return val2
}

// url, params, data数据都是已config2为主，不用默认属性
const stratKeysConfig2 = ['url', 'params', 'data']
stratKeysConfig2.forEach(key => {
  strats[key] = val2Strat
})
```

- 配置中的 headers 是一个复杂对象，多了 common、post、get 等属性，而这些属性中的值才是我们要真正添加到请求 header 中的.

```ts
export function flattenHeaders(headers: any, method: Method): any {
  if (!headers) {
    return headers
  }
  // 合并headers， headers.common,  headers[method]
  headers = deepMerge(headers.common || {}, headers[method] || {}, headers)

  const methodsToDelete = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'common']
  // 然后再把headers上的methodsToDelete中包含属性 删除
  methodsToDelete.forEach(method => {
    delete headers[method]
  })

  return headers
}
```
> stepe8: 请求和响应配置化
配置添加 transformRequest 和 transformResponse 两个字段，它们的值是一个数组或者是一个函数。

```ts
axios({
  transformRequest: [(function(data) {
    return qs.stringify(data)
  }), ...axios.defaults.transformRequest],
  transformResponse: [axios.defaults.transformResponse, function(data) {
    if (typeof data === 'object') {
      data.age = 25
    }
    return data
  }],
  url: '/config/post',
  method: 'post',
  data: {
    a: 1
  }
})
```
> stepe9: axios.create 静态接口

axios.create 的静态接口允许我们创建一个新的 axios 实例，同时允许我们传入新的配置和默认配置合并，并做为新的默认配置。

```ts
const instance = axios.create({
  transformRequest: [(function(data) {
    return qs.stringify(data)
  }), ...(axios.defaults.transformRequest as AxiosTransformer[])],
  transformResponse: [...(axios.defaults.transformResponse as AxiosTransformer[]), function(data) {
    if (typeof data === 'object') {
      data.age = 26
    }
    return data
  }]
})

instance({
  url: '/config/post',
  method: 'post',
  data: {
    a: 10
  }
})
```


