export default {
  root: process.env.NODE_ENV === 'development' ? 'http://localhost:8090' : '',
  userInfo: {
    name: null,
    id: null
  },
  addressBooksList: [],
  OnlineUser: {},
  unReadMsgCountList: [],
  totalUnreadMsgCounts: 0,
  VchatInfo: {},
  adressBooksMessages: [],
  currentChatRoomid: null
}
