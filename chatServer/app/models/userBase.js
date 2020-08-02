const db = require('@core/db')

let users = db.model('users', {
  name: { type: String, unique: true },
  pass: String,
  code: { type: String, unique: true },
  photo: { type: String, default: '/img/picture.png' },
  signature: { type: String, default: '这个人很懒，暂时没有签名哦！' },
  nickname: { type: String, default: ''},
  email: { type: String, default: '' },
  province: { type: Object, default: { name: '北京市', value: '110000' } },
  city: { type: Object, default: { name: '市辖区', value: '110100' } },
  town: { type: Object, default: { name: '海淀区', value: '110108' } },
  sex: { type: String, default: '3' }, // 0 男 1 女 3 保密
  signUpTime: { type: Date, default: Date.now() }, // 注册时间
  lastLoginTime: { type: Date, default: Date.now() }, // 最后一次登录
  conversationsList: Array, // 会话列表 * name 会话名称 * photo 会话头像 * roomID 会话id * type 会话类型 group / frend remarks
  cover: { type: Array, default: ['/img/cover.jpg', '/img/cover1.jpg'] }, // 封面展示
  emoji: Array // 表情包
})
module.exports = {
  users
}
