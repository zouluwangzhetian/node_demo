const fs = require('fs')
const path = require('path')

const fileName = path.resolve(__dirname, 'data.txt')

// 读取文件内容
fs.readFile(fileName, (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  // data 为二进制内容
  console.log(data.toString())
})