import { getUserInfo, getVchatInfo, findMyfriends } from '@/api/user'

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
  getAddressBooksList({ commit, state }) {
    return new Promise((resolve, reject) => {
      findMyfriends({ userid: state.userInfo.id }).then((res) => {
        if (res.data.error_code !== 0) {
          reject(res)
          return
        }
        commit('SET_ADDRESSBOOKS_LIST', res.data.data)
        resolve(res)
      })
    })
  },
  updateUserInfo({ commit }, obj) {
    commit('UPDATE_USER_INFO', obj)
  },
  // setAddressBooksList({ commit }, data) {
  //   commit('SET_ADDRESSBOOKS_LIST', data)
  // },
  addToaddressBooksList({ commit }, data) {
    commit('ADD_TO_ADDRESSBOOKS_LIST', data)
  },
  addAdressBooksMessages({ commit }, msg) {
    commit('ADD_ADRESS_BOOKS_MESSAGES', msg)
  },
  clearAdressBooksMessages({ commit }) {
    commit('CLEAR_ADRESS_BOOKS_MESSAGES')
  }
}
