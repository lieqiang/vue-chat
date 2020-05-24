const {
  // accountBase,
  users
} = require('./userBase')

class User {
  constructor() {

  }
  static async initHelper() {
    users.collection.dropIndexes()
    const info = {
      name: 'Vchat',
      pass: '66666666',
      photo: '/img/vchat.png',
      signature: 'chat官方团队',
      nickname: 'chat小助手'
    }
    new users(info).save()
  }
  static async signup(params) {
    users.collection.dropIndexes()
    const res = await users.find({name: params.username})
    if (res.length) {
      return {
        code: 1
      }
    }
    const response = await users.create({ name: params.username, pass: params.password })
    if (response['_id']) {
      return {
        code: 0
      }
    }
    return {
      code: -1
    }
  }
  static async signin(params) {
    return await users.find({name: params.username, pass: params.password})
  }
  static async getUserInfo(username) {
    return await users.find({name: username})
  }
  static async search(keyword) {
    let key = new RegExp(keyword)
    let params = [
      {
        'name': {// nickname
          '$regex': key, $options: '$i'
        }
      }
    ]

    const total = await users.countDocuments({
      $or: params
    })
    if (total > 0) {
      return await users.find({
        $or: params,
        name: {
          '$ne': 'Vchat' // 不等于、不包含
        }
      }, { // 指定返回的值
        name: 1, // nickname
        photo: 1,
        signature: 1
      }).limit(10).sort({'name': 1})
    }
  }
}

module.exports = {
  User
}