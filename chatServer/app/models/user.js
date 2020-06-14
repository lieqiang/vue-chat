const db = require('@core/db')

let users = db.model('users', {
  name: { type: String, unique: true },
  pass: String,
  code: { type: String, unique: true }, // 唯一的code
  photo: { type: String, default: '/img/picture.png' }, // 默认头像
  signature: { type: String, default: '这个人很懒，暂时没有签名哦！' },
  nickname: { type: String, default: ''},
  email: { type: String, default: '' },
  province: { type: Object, default: { name: '北京市', value: '110000' } }, // 省
  city: { type: Object, default: { name: '市辖区', value: '110100' } }, // 市
  town: { type: Object, default: { name: '海淀区', value: '110108' } }, // 县
  sex: { type: String, default: '3' }, // 0 男 1 女 3 保密
  signUpTime: { type: Date, default: Date.now() }, // 注册时间
  lastLoginTime: { type: Date, default: Date.now() }, // 最后一次登录
  conversationsList: Array, // 会话列表 * name 会话名称 * photo 会话头像 * roomID 会话id * type 会话类型 group / frend
  cover: { type: Array, default: ['/img/cover.jpg', '/img/cover1.jpg'] }, // 封面展示
  emoji: Array // 表情包
})

class User {
  constructor() {}
  static async initHelper() {
    // users.collection.dropIndexes()
    const info = {
      name: 'Vchat',
      pass: '12345678',
      photo: '/img/vchat.png',
      signature: 'chat官方团队',
      nickname: 'chat小助手'
    }
    // upsert:true:存在该数据则修改，不存在则添加
    const res = await users.updateOne({ name: 'Vchat' }, { $set: info }, { upsert: true })
    console.log('nModified', res.nModified)
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

  static async getUser(params) {
    return await users.find({name: params.username, pass: params.password})
  }

  static async getUserInfo(username) {
    return await users.find({name: username})
  }

  static async getVchatInfo() {
    return await users.find({name: 'Vchat'})
  }

  // 添加一个新的 好友到会话列表
  static async addToConversitionList(userName, params) {
    return await users.update({ name: userName }, {$push: { conversationsList: params }})
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
        _id: 1,
        name: 1, // nickname
        photo: 1,
        signature: 1,
        sex: 1,
        province: 1,
        city: 1,
        town: 1
      }).limit(10).sort({'name': 1})
    }
  }
}

module.exports = {
  User
}