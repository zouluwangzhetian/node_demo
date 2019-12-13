const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { set } = require('../db/redis')

const handlUserRouter = (req, res) => {
  const method = req.method
  const path = req.path

  // 登录接口
  if (method === 'POST' && path === '/api/user/login') {
    const { username, password } = req.body
    // const { username, password } = req.query
    const result = login(username, password)
    return result.then(data => {
      if (data.username) {
        // 设置 session
        req.session.username = data.username
        req.session.realname = data.realname
        // 同步到 redis
        set(req.sessionId, req.session)
        return new SuccessModel()
      }
      return new ErrorModel('登录失败')
    })
  }

  // 登录验证测试
//   if (method === 'GET' && path === '/api/user/login-test') {
//     if (req.session.username) {
//       return Promise.resolve(new SuccessModel({ session: req.session }))
//     }
//     return Promise.resolve(new ErrorModel('尚未登录'))
//   }
}

module.exports = handlUserRouter