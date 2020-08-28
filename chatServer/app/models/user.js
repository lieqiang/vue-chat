const db = require('@core/db')

let users = db.model('users', {
  name: {
    type: String,
    unique: true
  },
  pass: String,
  avatar: {
    type: String,
    default: ''
  },
  signature: {
    type: String,
    default: '这个人很懒，暂时没有签名哦！'
  },
  nickname: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  province: { 
    type: Object,
    default: {
      name: '北京市', value: '110000'
    }
  },
  city: {
    type: Object,
    default: {
      name: '市辖区',
      value: '110100'
    }
  },
  town: { type: Object,
    default: {
      name: '海淀区',
      value: '110108'
    }
  },
  sex: {
    type: String,
    default: '2'
  }, // 0 男 1 女 3 保密
  signUpTime: {
    type: Date,
    default: Date.now()
  },
  lastLoginTime: {
    type: Date,
    default: Date.now() 
  }
})

class User {
  constructor() {}
  static async initHelper() {
    // users.collection.dropIndexes()
    const info = {
      name: 'Vchat',
      pass: '12345678',
      avatar: '/img/vchat.png',
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
        name: 1,
        nickname: 1,
        avatar: 1,
        signature: 1,
        sex: 1,
        province: 1,
        city: 1,
        town: 1
      }).limit(10).sort({'name': 1})
    }
  }

  static async addToConversitionList(userName, params) {
    return await users.updateOne({ name: userName }, {$push: { conversationsList: params }})
  }

  static async updateUserInfo(params) {
    return await users.updateOne({ name: params.name }, { $set: params.field }, { upsert: true })
  }
}

module.exports = {
  User
}