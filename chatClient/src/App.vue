<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { parseTime } from '@/utils'
export default {
  sockets: {
    joined(OnlineUser) {
      console.log('客户端加入了', OnlineUser)
      // this.$store.commit('setOnlineUser', OnlineUser)
    },
    receivingVerificationMessage(data) {
      console.log(data)
      this.$store.dispatch('addAdressBooksMessages', data)
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'conversationsList'])
  },
  watch: {
    conversationsList(newList, oldList) {
      this.conversationsList.forEach(item => {
        const params = {
          name: this.userInfo.name,
          time: parseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}'),
          roomID: item.roomID
        }
        this.$socket.emit('join', params)
        console.log('params-- ', params)
        // let room = {
        //   roomid: item.roomID,
        //   offset: 1,
        //   limit: 200
        // }
        // this.$socket.emit('getHistoryMessages', room) 是否有必要？？？
      })
    }
  },
  created() {},
  methods: {

  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

/* #nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
