<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { Toast } from 'vant'
import { getHistoryMsg } from '@/api/message'
import { parseTime } from '@/utils'
Vue.use(Toast)

export default {
  data() {
    return {
      adressBooks: []
    }
  },
  sockets: {
    joined(OnlineUser) {
      console.log('joined', OnlineUser)
    },
    receivingVerificationMessage(data) {
      console.log(data)
      this.$store.dispatch('addAdressBooksMessages', data)
    },
    receiveAgreedMsg(params) {
      console.log('对方已同意你的好友申请')
      this.$store.dispatch('addToaddressBooksList', params)
    },
    receivingMsg(params) {
      if (!this.currentChatRoomid) {
        this.$store.dispatch('setUnReadMsgCounts', { msgList: [params], item: params, isNewMsg: true })
      }
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'VchatInfo',
      'addressBooksList',
      'totalUnreadMsgCounts',
      'currentChatRoomid'
    ])
  },
  watch: {
    userInfo(n, o) {
      const params = {
        name: n.name,
        time: parseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}'),
        roomid: n.roomid
      }
      this.$socket.emit('join', params)
    },
    VchatInfo(n, o) {
      const params = {
        name: n.name,
        time: parseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}'),
        roomid: n.roomid
      }
      this.$socket.emit('join', params)
    },
    addressBooksList(newList, oldList) {
      newList.forEach(item => {
        if (!this.adressBooks.includes(item.name)) {
          const params = {
            name: item.name,
            time: parseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}'),
            roomid: item.roomid
          }
          this.$socket.emit('join', params)
          this.adressBooks.push(item.name)
          this.getHistoryMsg(item)
        }
      })
    }
  },
  methods: {
    async getHistoryMsg(item) {
      const { roomid } = item
      const res = await getHistoryMsg({ roomid })
      if (res.data.error_code !== 0) {
        Toast(res.data.msg)
        return
      }
      this.$store.dispatch('setUnReadMsgCounts', { msgList: res.data.data, item: item })
    }
  }
}
</script>
<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
