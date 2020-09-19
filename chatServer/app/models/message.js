const db = require('@core/db')

const { Schema } = db
const messagesSchema = new Schema({
  userid: String,
  senderName: String, // 用户登录名
  senderNickname: String, // 用户昵称
  senderSignature: String, // 个性签名
  senderAvatar: String,
  senderID: {
    type : db.Schema.ObjectId,
    ref : 'users'
  },
  time: Number,
  message: String,
  read: Array,
  groupId: String, // 加入群聊id
  groupName: String, // 加入群聊名称
  roomid: String,
  receiverID: String, // 好友id
  receiverName: String, // 好友用户名
  receiverNickname: String,
  receiverSystemRoomID: String, // 系统消息房间
  receiverAvatar: String,
  state: String, // group / friend
  type: String, // validate / info
  msgType: String,
  status: String, // 0 未操作 1 同意 2 拒绝
  validationMessage: String,
  remarks: String
})

const messages = db.model('messages', messagesSchema)
class Message {
  constructor() {}
  async saveMessage(params) {
    return await messages.create(params)
  }
  async getSystemMessages(roomid) {
    try {
      return await messages.find({
        receiverSystemRoomID: roomid
      })
      .sort({ 'time': -1 })
      .skip(0)
      .limit(100).populate({
        path: 'senderID',
        select: 'name signature avatar nickname'
      })
    } catch(err) {
      console.log(err)
    }
  }

  async getHistoryMsg(roomid) {
    try {
      return await messages.find({
        roomid: roomid,
        type: {
          '$ne': 'validate'
        }
      })
      .sort({
        'theDate': -1 
      })
      .skip(0)
      .limit(100).populate({
        path: 'senderID',
        select: 'name signature avatar nickname'
      })
    } catch(err) {
      console.log(err)
    }
  }
  async setMessageStatus(params) {
    return await messages.updateOne({
      senderID: params.senderID
    }, {
        $set: {
          status: params.status
        }
      }, {
        upsert: true
      })
  }

  async setMsgHadRead(params) {
    try {
      const res = await messages.find({
        roomid: params.roomid
      })
      res.forEach((item) => {
        if (!item.read.includes(params.name)) {
          item.read.push(params.name)
          item.save()
        }
      })
      return res
    } catch(err) {
      console.log(err)
    }
  }

}

module.exports = {
  Message
}
