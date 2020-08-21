import { getUserInfo, getVchatInfo } from '@/api/user'

export default {
  getUserInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getUserInfo({ username: localStorage.getItem('username') }).then(res => {
        if (res.data.error_code !== 0) {
          reject(res)
          return
        }
        const userData = res.data.data
        userData.avatar = `${state.root}${userData.avatar}`
        commit('SET_USER_INFO', userData)
        if (userData.conversationsList.length) {
          commit('SET_CONVERSATIONS_LIST', userData.conversationsList)
        }
        resolve(res)
      })
    })
  },
  async getVchatInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getVchatInfo().then(res => {
        if (res.data.error_code !== 0) {
          reject(res)
          return
        }
        const info = res.data.data
        const roomid = `${state.userInfo.id}-${info.id}`
        const vchatInfo = Object.assign({ }, info, { type: 'vchat' }, { roomid })
        commit('SET_VCHAT_INFO', vchatInfo)
        resolve(res)
      })
    })
  },
  updateUserInfo({ commit }, obj) {
    commit('UPDATE_USER_INFO', obj)
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
