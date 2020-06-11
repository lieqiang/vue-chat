import { Toast } from 'vant'
import { getUserInfo, getVchatInfo } from '@/api/user'
export default {
  async getUserInfo({ commit, state }) { // 获取用户登录信息
    const res = await getUserInfo({ username: state.username || 'chat2020' }) // 需改
    if (res.data.error_code !== 0) {
      Toast(res.data.msg)
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
  },
  async getVchatInfo({ commit, state }) { // 获取官方账号信息
    const res = await getVchatInfo()
    if (res.data.error_code !== 0) {
      Toast(res.data.msg)
      return
    }
    console.log(res)
    const info = res.data.data
    const roomID = `${state.userInfo.id}-${info.id}`
    const vchatInfo = Object.assign({ }, info, { type: 'vchat' }, { roomID })
    commit('ADD_TO_CONVEASATIONS_LIST', vchatInfo)
    commit('SET_VCHAT_INFO', vchatInfo)
  },
  setUserName({ commit, state }, username) {
    commit('SET_USER_NAME', username)
  },
  addAdressBooksMessages({ commit, state }, msg) {
    commit('ADD_ADRESS_BOOKS_MESSAGES', msg)
  }
}
