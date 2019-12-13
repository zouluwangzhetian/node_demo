const { exec } = require('../db/mysql')
const getList = (author, keyword) => {
  let sql = `select * from blogs where 1=1 and state=1 `
  if (author) {
    sql += `and author='${author}' `
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `
  }
  sql += `order by createdtime desc;`
  return exec(sql)
}

const getDetail = id => {
  let sql = `select * from blogs where id='${id}';`
  return exec(sql).then(rows => {
    return rows[0]
  })
}

const newBlog = (blogData = {}) => {
  const title = blogData.title
  const content = blogData.content
  const author = blogData.author
  const createdTime = Date.now()
  let sql = `insert into blogs (title,content,author,createdTime) values ('${title}','${content}','${author}',${createdTime})`
  return exec(sql).then(insertData => {
    return {
      id: insertData.insertId
    }
  })
}

const upDateBlog = (id, blogData) => {
  const title = blogData.title
  const content = blogData.content
  let sql = `update blogs set title='${title}',content='${content}' where id=${id}`
  return exec(sql).then(updateData => {
    if (updateData.affectedRows > 0) {
      return true
    }
    return false
  })
}

const delBlog = (id, author) => {
  let sql = `update blogs set state=0 where id=${id} and author='${author}'`
  return exec(sql).then(delData => {
    if (delData.affectedRows > 0) {
      return true
    }
    return false
  })
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  upDateBlog,
  delBlog
}