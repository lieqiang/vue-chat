<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { parseTime } from '@/utils'
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
      this.$store.dispatch('addToConversationsList', params) // 需优化
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'conversationsList'])
  },
  watch: {
    conversationsList(newList, oldList) {
      this.conversationsList.forEach(item => {
        if (!this.adressBooks.includes(item.name)) {
          const params = {
            name: this.userInfo.name,
            time: parseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}'),
            roomid: item.roomid
          }
          this.$socket.emit('join', params)
          this.adressBooks.push(item.name)
          console.log('客户端加入了', params)
          console.log('conversationsList', newList)
        }
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
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* color: #2c3e50; */
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
