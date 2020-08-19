export default {
  root: process.env.NODE_ENV === 'development' ? 'http://localhost:8090' : '',
  userInfo: {
    name: '',
    id: ''
  },
  conversationsList: [],
  OnlineUser: {}, // 在线人数
  unRead: [], // 未读消息
  VchatInfo: {}, // 官方账号信息
  adressBooksMessages: []
}
