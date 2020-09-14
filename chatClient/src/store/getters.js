const getters = {
  root: state => state.root,
  userInfo: state => state.userInfo,
  addressBooksList: state => state.addressBooksList,
  VchatInfo: state => state.VchatInfo,
  adressBooksMessages: state => state.adressBooksMessages,
  unReadMsgCountList: state => state.unReadMsgCountList,
  totalUnreadMsgCounts: state => state.totalUnreadMsgCounts,
  currentChatRoomid: state => state.currentChatRoomid
}
export default getters
