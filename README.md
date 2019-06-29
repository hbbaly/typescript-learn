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