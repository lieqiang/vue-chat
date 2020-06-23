const db = require('@core/db')

const { Schema } = db
// friendAndVchatRoomID selfAndfriendRoomID 是否有必要更改，确认？？？
const messagesSchema = new Schema({
  name: String, // 用户登录名
  nickname: String, // 用户昵称
  time: String, // 时间
  mes: String, // 消息
  read: Array, // 是否已读 0/1
  signature: String, // 个性签名
  groupId: String, // 加入群聊id
  groupName: String, // 加入群聊名称
  // groupPhoto: String, //加入群聊头像
  userID: String, // 用户id
  selfAndfriendRoomID: String,
  friendId: String, // 好友id
  friendname: String, // 好友昵称
  friendAndVchatRoomID: String, // 好友房间
  state: String, // group / friend
  type: String, // validate / info
  status: String, // 0 未操作 1 同意 2 拒绝
  validationMessage: String
})

const messages = db.model('messages', messagesSchema)
class Message {
  constructor() {}
  async saveMessage(params) {
    return await messages.create(params)
  }
  async getSystemMessages(roomID) {
    try {
      return await messages.find({ friendAndVchatRoomID: roomID })
      .sort({ 'time': -1 })
      .skip(0)
      .limit(100)
    } catch(err) {
      console.log(err)
    }
  }
  async setMessageStatus(params) {
    return await Model.update({ name: 'dora' },  { multi: true, $set: { age: 18 } }) // nModified
  }
}

module.exports = {
  Message
}
