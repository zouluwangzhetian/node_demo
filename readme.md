# node 注意事项
---
## 常用插件
+ cross-env 跨平台工具包
 - "dev": "cross-env NODE_ENV=dev nodemon ./bin/www.js",
 - "prd": "cross-env NODE_ENV=production nodemon ./bin/www.js"

---

+ nodemon 热更新
 - 更改文件后自动重启

---

## node 自带模块
+ http：http请求 初始化 http 链接 createServer
	- listen(8000)  监听端口号，响应 http 请求
 
---

+ querystring：将 get 请求的参数序列化
	- querystring.parse(url.split('?')[1])

---

+ fs: 文件操作

---

+ path: 文件路径操作
 - path.resolve(\_\_dirname, '需要操作文件的文件夹',  '需要操作的文件') 
 	- \_\_dirname: 当前文件的目录(node全局变量)
 	- path.resolve 找到需要的文件在电脑中的绝对路径

 ---

 - fs.fullFuleName('文件的绝对路径', (err, data) => {})  获取文件(异步操作)

---

## 语法
+ res.setHeader('Content-type', 'application/json')
 - 设置返回格式为 json 格式，必备常用数据体，一般书写在 createServer 回调函数中

---

+ post 请求与 get 请求参数获取不同，post 为流数据
 - req.on('data', chunk => { chunk.toString() })  开始获取 post 请求 数据
 - req.on('end', () => { res.end(JSON.stringify()) }) post 请求数据获取结束， 并结束请求返回数据

---

+ res.end()
	- 请求结束，可返回参数。例如 get 请求 res.end(JSON.stringify(data))
