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
      return { code: 1 }
    }
    const response = await users.create({ name: params.username, pass: params.password })
    if (response['_id']) {
      return { code: 0 }
    }
    return { code: -1 }
  }
}

module.exports = {
  User
}