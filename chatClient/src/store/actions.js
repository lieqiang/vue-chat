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
        const roomID = `${state.userInfo.id}-${info.id}`
        const vchatInfo = Object.assign({ }, info, { type: 'vchat' }, { roomID })
        commit('ADD_TO_CONVEASATIONS_LIST', vchatInfo)
        commit('SET_VCHAT_INFO', vchatInfo)
        resolve(res)
      })
    })
  },
  addAdressBooksMessages({ commit, state }, msg) {
    commit('ADD_ADRESS_BOOKS_MESSAGES', msg)
  }
}
