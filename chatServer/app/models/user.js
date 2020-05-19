const {
  // accountBase,
  users
} = require('./userBase')

class User {
  constructor() {

  }
  static async signup(params) {
    users.collection.dropIndexes()
    const res = await users.find({name: params.username})
    if (res.length) {
      return {
        code: 1,
        message: '该用户已注册'
      }
    }
    const response = await users.create({ name: params.username, pass: params.password })
    if (response['_id']) {
      return {
        code: 0,
        message: '注册成功'
      }
    }
    return {
      code: -1,
      message: '注册失败'
    }
  }
  static async signin(params) {
    // users.collection.dropIndexes()
    const res = await users.find({name: params.username, pass: params.password})
    if (!res.length) {
      return {
        code: -1,
        message: '用户名或密码错误'
      }
    }
    // const response = await users.create({ name: params.username, pass: params.password })
    // if (response['_id']) {
    //   return {
    //     code: 0,
    //     message: '注册成功'
    //   }
    // }
    // return {
    //   code: -1,
    //   message: '注册失败'
    // }
  }
}

module.exports = {
  User
}