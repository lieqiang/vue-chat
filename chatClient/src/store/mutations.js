export default {
  SET_USER_NAME(state, username) {
    state.username = username
  },
  SET_USER_INFO(state, data) {
    state.userInfo = data
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
  ADD_TO_CONVEASATIONS_LIST(state, data) {
    state.conversationsList.push(data)
  },
  SET_ONLINE_USER(state, data) {
    state.OnlineUser = data
  },
  ADD_ADRESS_BOOKS_MESSAGES(state, msg) {
    state.adressBooksMessages.push(msg)
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
