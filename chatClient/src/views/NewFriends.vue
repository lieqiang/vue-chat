<template>
  <div>
    <van-nav-bar
      fixed
      left-text="新的朋友"
      right-text="添加朋友"
      left-arrow
      @click-left="$router.go(-1)"
      @click-right="goSearch"
    />
    <div class="main-content">
      <van-cell-group class="list">
        <van-cell
          center
          v-for="(item, index) in list"
          :key="index"
          @click="linkToFriendDetail(item)"
        >
          <template #title>
            <van-image
              round
              width="50"
              height="50"
              :src="getAvatar(item.senderAvatar)"
            />
          </template>
          <template #right-icon>
            <div class="right">
              <div class="info">
                <span class="name">{{ item.senderNickname || item.senderName }}</span>
                <span class="desc">{{ item.validationMessage | setValidateMsg }}</span>
              </div>
              <div class="status">
                <van-button v-if="item.status === '0'" type="primary" size="small" @click.stop="addToAddressBooks(item)">添加</van-button>
                <span v-if="item.status === '1'" class="added">已添加</span>
                <span v-if="item.status === '2'" class="added">已过期</span>
              </div>
            </div>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
    <van-empty
      v-show="!list.length"
      description="暂无好友申请"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import BScroll from '@better-scroll/core'
import { mapGetters } from 'vuex'
import { NavBar, CellGroup, Cell, Image as VanImage, Icon, Button, Empty, Toast } from 'vant'
import { getNewFriendsMsg } from '@/api/message'
Vue.use(NavBar)
Vue.use(CellGroup)
Vue.use(Cell)
Vue.use(VanImage)
Vue.use(Icon)
Vue.use(Button)
Vue.use(Empty)
Vue.use(Toast)
export default {
  name: 'NewFriends',
  sockets: {
    receiveAgreedSuccess(params) {
      this.$store.dispatch('addToaddressBooksList', params)
      Toast('添加成功')
      this.$router.push({
        path: '/friendDetail',
        query: {
          username: params.name
        }
      })
    }
  },
  filters: {
    setValidateMsg(remarks) {
      if (remarks) {
        return remarks
      }
      return '请求添加你为朋友'
    }
  },
  data() {
    return {
      list: []
    }
  },
  computed: {
    ...mapGetters(['VchatInfo', 'root'])
  },
  watch: {
  },
  created() {
    this.getNewFriendsMsg()
    this.clearSystemMsg()
  },
  methods: {
    async getNewFriendsMsg() {
      const roomid = this.VchatInfo.roomid
      const res = await getNewFriendsMsg({ roomid })
      if (res.data.error_code !== 0) {
        return
      }
      this.list = res.data.data
      this.$nextTick(() => {
        const wrapper = document.querySelector('.main-content')
        const scroll = new BScroll(wrapper, { // eslint-disable-line
          click: true
        })
      })
    },
    getAvatar(avatar) {
      if (avatar) {
        return `${this.root}${avatar}`
      }
      return require('@/assets/default.jpg')
    },
    clearSystemMsg() {
      this.$store.dispatch('clearAdressBooksMessages')
    },
    addToAddressBooks(item) {
      this.$socket.emit('agreeAdd', item)
    },
    linkToFriendDetail(item) {
      if (item.status === '1') {
        this.$router.push({
          path: '/friendDetail',
          query: {
            username: item.senderName
          }
        })
      }
    },
    goSearch() {
      this.$router.push({
        path: '/search'
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .van-cell__title {
    flex: 0 0 50px;
  }
  .right {
    display: flex;
    flex: 1;
    align-items: center;
    padding: 5px 0 5px 16px;
    overflow: hidden;
    .name {
      font-size: 14px;
      color: #333;
    }
    .desc {
      font-size: 12px;
      color: #666;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .info {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
  }
  .status {
    flex: 0 0 60px;
    padding-left: 10px;
    color: #666;
  }
</style>
