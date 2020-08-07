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
        const data = res.data.data
        commit('SET_USER_INFO', data)
        if (data.conversationsList.length) {
          commit('SET_CONVERSATIONS_LIST', res.data.data.conversationsList)
        }
        console.log('userInfo', data)
        console.log('conversationsList', data.conversationsList)
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
