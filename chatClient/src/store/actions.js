import { getUserInfo, getVchatInfo } from '@/api/user'
export default {
  getUserInfo({ commit, state }) { // 获取用户登录信息
    return new Promise((resolve, reject) => {
      getUserInfo({ username: localStorage.getItem('username') }).then(res => {
        if (res.data.error_code !== 0) {
          reject(res)
          return
        }
        console.log(res)
        const userData = res.data.data
        userData.avatar = `${state.root}${userData.avatar}`
        commit('SET_USER_INFO', userData)
        if (userData.conversationsList.length) {
          commit('SET_CONVERSATIONS_LIST', userData.conversationsList)
        }
        console.log('userInfo', userData)
        console.log('conversationsList', userData.conversationsList)
        resolve(res)
      })
    })
  },
  async getVchatInfo({ commit, state }) { // 获取官方账号信息
    return new Promise((resolve, reject) => {
      getVchatInfo().then(res => {
        if (res.data.error_code !== 0) {
          reject(res)
          return
        }
        console.log(res)
        const info = res.data.data
        const roomid = `${state.userInfo.id}-${info.id}`
        console.log('vchat-roomid', roomid)
        const vchatInfo = Object.assign({ }, info, { type: 'vchat' }, { roomid }) // 这里可以不需要写进 conversationsList 里面
        commit('ADD_TO_CONVERSATIONS_LIST', vchatInfo) // CONVEASATIONS_LIST 写进路由里面 不写 homepage
        commit('SET_VCHAT_INFO', vchatInfo)
        resolve(res)
      })
    })
  },
  setUserAvatar({ commit }, url) {
    commit('SET_USER_AVATAR', url)
  },
  addToConversationsList({ commit }, data) {
    commit('ADD_TO_CONVERSATIONS_LIST', data)
  },
  addAdressBooksMessages({ commit }, msg) {
    commit('ADD_ADRESS_BOOKS_MESSAGES', msg)
  },
  clearAdressBooksMessages({ commit }) {
    commit('CLEAR_ADRESS_BOOKS_MESSAGES')
  }
}
