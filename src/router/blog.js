const { getList, getDetail, newBlog, upDateBlog, delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

// 统一登录验证函数
const loginCheck = req => {
  if (!req.session.username) {
    return Promise.resolve(new ErrorModel('尚未登录'))
  }
}

const handleBlogRouter = (req, res) => {
  const id = req.query.id
  const method = req.method
  const path = req.path

  // 获取博客列表
  if (method === 'GET' && path === '/api/blog/list') {
    let author = req.query.author || ''
    const keyword = req.query.keyword || ''

    if (req.query.isadmin) {
      // 管理员界面
      const loginCheckResult = loginCheck(req)
      if (loginCheckResult) {
        // 有返回值说明未登录
        return loginCheckResult
      }
      // 强制查询自己的博客
      author = req.session.username
    }
    const result = getList(author, keyword)
    return result.then(listData => {
      return new SuccessModel(listData)
    })
  }

  // 获取博客详情
  if (method === 'GET' && path === '/api/blog/detail') {
    if (id) {
      const result = getDetail(id)
      return result.then(data => {
        return new SuccessModel(data)
      })
    } else {
      return new Promise((res, rej) => {
        return res(new ErrorModel('id不正确'))
      })
    }
  }

  // 新建一篇博客
  if (method === 'POST' && path === '/api/blog/new') {
    const loginCheckResult = loginCheck(req)
    if (loginCheckResult) {
      return loginCheckResult
    }

    req.body.author = req.session.username
    const result = newBlog(req.body)
    return result.then(data => {
      return new SuccessModel(data)
    })
  }

  // 更新博客
  if (method === 'POST' && path === '/api/blog/update') {
    const loginCheckResult = loginCheck(req)
    if (loginCheckResult) {
      return loginCheckResult
    }
    const result = upDateBlog(id, req.body)
    return result.then(res => {
      if (res) {
        return new SuccessModel()
      }
      return new ErrorModel('更新失败')
    })
  }

  // 删除博客
  if (method === 'POST' && path === '/api/blog/del') {
    const loginCheckResult = loginCheck(req)
    if (loginCheckResult) {
      return loginCheckResult
    }
    const author = req.session.username
    const result = delBlog(id, author)
    return result.then(res => {
      if (res) {
        return new SuccessModel()
      }
      return new ErrorModel('删除失败')
    })
  }
}

module.exports = handleBlogRouter