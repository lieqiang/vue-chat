export default {
  root: process.env.NODE_ENV === 'development' ? 'http://localhost:8090' : '',
  userInfo: {
    name: 'chat2020',
    id: '5ed1bade1f4cf20d6c0da7e6'
  },
  conversationsList: [],
  OnlineUser: {}, // 在线人数
  unRead: [], // 未读消息
  VchatInfo: {}, // 官方账号信息
  adressBooksMessages: []
}
