const db = require('@core/db')

let friendlySchema = new db.Schema({
  senderID: {
    type : db.Schema.ObjectId,
    ref : 'users'
  },
  receiverID: {
    type : db.Schema.ObjectId,
    ref : 'users'
  },
  createDate: {
    type: Date, default: Date.now()
  },
  isInChatChannels: {
    type: Boolean,
    default: false
  }
})

async function findFriendByUserM (userId) {
  return friendly.find({ senderID: userId }).populate({ path: 'receiverID', select: 'signature avatar nickname name' }) // 关联查询
}
async function findFriendByUserY (userId) {
  return friendly.find({ receiverID: userId }).populate({ path: 'senderID', select: 'signature avatar nickname name' })
}

let friendly = db.model('friendlies', friendlySchema) // friendly 创建的文档是 friendlies 坑！！！

const findMyfriends = async (userId) => {
  const senderID = await findFriendByUserM(userId)
  const receiverID = await findFriendByUserY(userId)
  return {
    senderID,
    receiverID
  }
}

const checkMyfriends = (params, callback) => { // 验证是否已加为好友
//   checkMyfriends() { // 检查是否是我的好友，是否可以不发送请求？
//     let params = {
//         userM: this.$route.params.id,
//         userY: this.user.id
//     };
//     api.checkMyfriends(params).then(r => {
//         if (r.code === 0) {
//             this.myFriendFlag = r.data;
//         }
//     })
// }
  let pr = {userM: params.userY, userY: params.userM};
  friendly.find(params).then(r => { // 类似下面的写法，别学
    if (r.length > 0) {
      callback({code: 0, data: true})
    } else {
      friendly.find(pr).then(r => {
        if (r.length > 0) {
          callback({code: 0, data: true})
        } else {
          callback({code: 0, data: false})
        }
      })
    }
  }).catch(err => {
    callback({code: -1, data: err})
  })
}

const addFriend = (params, callback) => {
  console.log('paramssss', params)
  let pr = {
    senderID: params.senderID,
    receiverID: params.receiverID
  }
  friendly.find(pr).then(m => {
    friendly.find({
      senderID: params.receiverID,
      receiverID: params.senderID
    }).then(y => {
      if (!(m.length + y.length)) {
        friendly.create(pr).then(r => {
          if (r['_id']) {
            callback({code: 0})
            console.log('code 0')
          } else {
            callback({code: -1})
            console.log('code 1')
          }
        })
      } else {
        callback({code: -3})
        console.log('code 3')
      }
    })
  })
}

module.exports = {
  findMyfriends,
  checkMyfriends,
  addFriend
}
