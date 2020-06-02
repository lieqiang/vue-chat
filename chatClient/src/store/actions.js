import { Toast } from 'vant'
import { getUserInfo, getVchatInfo } from '@/api/user'
export default {
  async getUserInfo({ commit, state }) { // 获取用户登录信息
    const res = await getUserInfo({ username: state.username })
    if (res.data.error_code !== 0) {
      Toast(res.data.msg)
      return
    }
    console.log(res)
    commit('SET_USER_INFO', res.data.data)
    commit('SET_CONVERSATIONS_LIST', res.data.data.conversationsList)
    console.log('state', state.userInfo)
    console.log('state2', state.conversationsList)
  },
  async getVchatInfo({ commit, state }) { // 获取官方账号信息
    const res = await getVchatInfo()
    if (res.data.error_code !== 0) {
      Toast(res.data.msg)
      return
    }
    console.log(res)
    const vchatInfo = res.data.data
    const roomId = `${state.userInfo.id}-${vchatInfo.id}`
    commit('ADD_TO_CONVEASATIONS_LIST', vchatInfo)
    commit('SET_VCHAT_INFO', Object.assign({ }, vchatInfo, { type: 'vchat' }, { roomId }))
  },
  setUserName({ commit, state }, username) {
    commit('SET_USER_NAME', username)
  }
}
