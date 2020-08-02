const db = require('@core/db')

const { Schema } = db
const messagesSchema = new Schema({
  senderName: String, // 用户登录名
  senderNickname: String, // 用户昵称
  senderSignature: String, // 个性签名
  senderID: String, // 用户id
  time: String, // 时间
  message: String, // 消息
  read: Array, // 是否已读 0/1
  groupId: String, // 加入群聊id
  groupName: String, // 加入群聊名称
  // groupPhoto: String, // 加入群聊头像
  senderAndReceiverRoomID: String,
  receiverID: String, // 好友id
  receiverName: String, // 好友用户名
  receiverNickname: String,
  receiverSystemRoomID: String, // 系统消息房间
  state: String, // group / friend
  type: String, // validate / info
  status: String, // 0 未操作 1 同意 2 拒绝
  validationMessage: String,
  remarks: String // 备注
})

const messages = db.model('messages', messagesSchema)
class Message {
  constructor() {}
  async saveMessage(params) {
    return await messages.create(params)
  }
  async getSystemMessages(roomID) {
    try {
      return await messages.find({ receiverSystemRoomID: roomID })
      .sort({ 'time': -1 })
      .skip(0)
      .limit(100)
    } catch(err) {
      console.log(err)
    }
  }
  async setMessageStatus(params) {
    return await messages.updateOne({ senderID: params.senderID }, { $set: { status: params.status } }, { upsert: true })
  }
}

module.exports = {
  Message
}
