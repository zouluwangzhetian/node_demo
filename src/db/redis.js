const redis = require('redis')
const { REDIS_CONF } = require('../config/db')

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error', err => {
  console.error(err)
})

function set(key, val) {
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }
  redisClient.set(key, val, redis.print)
}

function get(key) {
  const promise = new Promise((res, rej) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        rej(err)
        return
      }
      if (val == null) {
        res(null)
        return 
      }

      try {
        res(JSON.parse(val))
      } catch (ex) {
        res(val)
      }
    })
  })
  return promise
}

module.exports = {
  set,
  get
}