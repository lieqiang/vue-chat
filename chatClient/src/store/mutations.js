export default {
  SET_USER_INFO(state, data) {
    state.userInfo = data
  },
  UPDATE_USER_INFO(state, obj) {
    state.userInfo = Object.assign(state.userInfo, obj)
  },
  SET_VCHAT_INFO(state, data) {
    state.VchatInfo = data
  },
  setIslogin(state, data) {
    state.isLogin = data
  },
  SET_CONVERSATIONS_LIST(state, data) {
    state.conversationsList = data
  },
  ADD_TO_CONVERSATIONS_LIST(state, data) {
    state.conversationsList.push(data)
  },
  SET_ONLINE_USER(state, data) {
    state.OnlineUser = data
  },
  ADD_ADRESS_BOOKS_MESSAGES(state, msg) {
    state.adressBooksMessages.push(msg)
  },
  CLEAR_ADRESS_BOOKS_MESSAGES(state) {
    state.adressBooksMessages = []
  },
  SET_UN_READ(state, data) {
    if (data.clear) {
      state.unRead.forEach(v => {
        if (v.roomid === data.roomid) {
          v.count = 0
        }
      })
      return
    }
    const unRead = state.unRead.filter(v => v.roomid === data.roomid)
    if (unRead.length) {
      state.unRead.forEach(v => {
        if (v.roomid === data.roomid) {
          if (data.add) {
            v.count++
          } else {
            v.count = data.count
          }
        }
      })
    } else {
      state.unRead.push({ roomid: data.roomid, count: data.count })
    }
  }
}
