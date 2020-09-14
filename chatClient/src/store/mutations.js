import { findIndex, isEmpty } from '@/utils'
import Vue from 'vue'
import store from './index'

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
  SET_ADDRESSBOOKS_LIST(state, data) {
    state.addressBooksList = data
  },
  ADD_TO_ADDRESSBOOKS_LIST(state, data) {
    state.addressBooksList.push(data)
  },
  ADD_ADRESS_BOOKS_MESSAGES(state, msg) {
    state.adressBooksMessages.push(msg)
  },
  CLEAR_ADRESS_BOOKS_MESSAGES(state) {
    state.adressBooksMessages = []
  },
  SET_UNREAD_MSG_COUNTS(state, obj) {
    const unReadCounts = obj.msgList.filter(item => !item.read.includes(state.userInfo.name))
    const idx = findIndex(state.unReadMsgCountList, obj.item.roomid)
    if (isEmpty(idx)) {
      const params = {
        name: obj.item.name,
        roomid: obj.item.roomid,
        unReadCounts: unReadCounts.length
      }
      state.unReadMsgCountList.push(params)
    } else {
      state.unReadMsgCountList[idx].unReadCounts = obj.isNewMsg ? state.unReadMsgCountList[idx].unReadCounts + 1 : unReadCounts.length
    }
    let count = 0
    state.addressBooksList.forEach((item, idx) => {
      state.unReadMsgCountList.forEach((cell) => {
        if (item.roomid === cell.roomid) {
          count = count + cell.unReadCounts
          Vue.set(state.addressBooksList, idx, Object.assign(item, { unReadCounts: cell.unReadCounts }))
        }
      })
    })
    // console.log('state.unReadMsgCountList', state.unReadMsgCountList)
    // console.log('state.addressBooksList', state.addressBooksList)
    store.dispatch('setTotalUnreadMsgCounts', count)
  },
  SET_TOTAL_UNREAD_MSG_COUNTS(state, total) {
    state.totalUnreadMsgCounts = total
  },
  SET_CURRENT_CHAT_ROOMID(state, roomid) {
    state.currentChatRoomid = roomid
  }
}
