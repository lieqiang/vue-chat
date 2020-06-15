const getters = {
  userInfo: state => state.userInfo,
  conversationsList: state => state.conversationsList,
  VchatInfo: state => state.VchatInfo,
  adressBooksMessages: state => state.adressBooksMessages
}
export default getters
// export default {
//   // unReadCount(state) {
//   //   let count = 0
//   //   state.unRead.forEach(v => {
//   //     count += v.count
//   //   })
//   //   return count
//   // }
// }
