const { LinValidator, Rule } = require('@core/lin-validator-v2')
// const User = require('@models/user')
// const { LoginType, artType } = require('@lib/enum')
class PositiveIntegerValidator extends LinValidator {
  constructor() {
    super()
    this.id = [
      new Rule('isInt', 'id需要是正整数', {
        min: 1
      })
    ]
  }
}

class RegisterValidator extends LinValidator {
  constructor() {
    super()
    this.username = [
      new Rule('isLength', '用户名不符合长度规范', {
        min: 4,
        max: 32
      })
    ]
    this.password = [
      new Rule('isLength', '密码至少6个字符，最多32个字符', {
        min: 6,
        max: 32
      }),
      new Rule('matches', '密码不符合规范', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')
    ]
    // this.password2 = this.password1
    // this.nickname = [
  //     new Rule('isLength', '昵称不符合长度规范', {
//         min: 4,
//         max: 32
  //     }),
    // ]
  }

  // validatePassword(vals) {
  //   const psw1 = vals.body.password
  //   const psw2 = vals.body.password2
  //   if (psw1 !== psw2) {
  //     throw new Error('两个密码必须相同')
  //   }
  // }

  // async validateEmail(vals) { // 数据 异步操作 需加上 asnc
//    const email = vals.body.email
//    const user = await User.findOne({
//      where: {
//        email: email
//      }
//    })
//     if (user) {
//       throw new Error('email已经存在')
//     }
  // }

}

class TokenValidator extends LinValidator {
  constructor() {
    super()
    this.account = [
      new Rule('isLength', '不符合账号规则', {
        min: 4,
        max: 32
      })
    ]
    this.secret = [
      // validator.js
      new Rule('isOptional'),
      new Rule('isLength', '至少6个字符', {
        min: 6,
        max: 128
      })
    ]
    this.validateType = checkType
  }
}

class NotEmptyValidator extends LinValidator {
  constructor() {
    super()
    this.token = [
      new Rule('isLength', 'token不能为空', { min: 1 })
    ]
  }
}

class MsgHadReadValidator extends LinValidator {
  constructor() {
    super()
    this.name = [
      new Rule('isLength', 'name不能为空', { min: 1 })
    ]
    this.roomid = [
      new Rule('isLength', 'roomid不能为空', { min: 1 })
    ]
  }
}

class SearchValidator extends LinValidator {
  constructor() {
    super()
    this.q = [
      new Rule('isLength', '搜索关键词不能为空', {
        min: 1,
        max: 16
      })
    ]
    this.start = [
      new Rule('isInt', '不符合规范', {
        min: 0,
        max: 60000
      }),
      new Rule('isOptional', '', 0)
    ]
    this.count = [
      new Rule('isInt', '不符合规范', {
        min: 1,
        max: 20
      }),
      new Rule('isOptional', '', 20)
    ]
  }
}

module.exports = {
  PositiveIntegerValidator,
  RegisterValidator,
  TokenValidator,
  NotEmptyValidator,
  SearchValidator,
  MsgHadReadValidator
}