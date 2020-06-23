<template>
  <div>
    <van-nav-bar fixed left-arrow @click-left="back">
      <template #right>
        <van-icon name="ellipsis" size="18" />
      </template>
    </van-nav-bar>
    <van-cell-group class="list">
      <van-cell center class="avatar">
        <template #title>
          <van-image
            round
            width="50"
            height="50"
            :src="friend.src"
          />
        </template>
        <template #right-icon>
          <div class="right">
            <span class="name">{{ friend.name }}</span>
            <span class="desc">地区：{{ friend.province.name }}-{{ friend.city.name }}-{{ friend.town.name }}</span>
          </div>
        </template>
      </van-cell>
      <van-cell title="个性签名" :value="friend.signature" class="mt-5" value-class="center" />
      <van-cell title="来源" value="搜索" value-class="center" />
    </van-cell-group>
    <div class="add pt-5">
      <van-button block type="default" @click="addToConversations">添加到通讯录</van-button>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { NavBar, Icon, Button, Cell, CellGroup, Image as VanImage } from 'vant'
import { mapState } from 'vuex'
import { parseTime } from '@/utils'
Vue.use(NavBar).use(Icon).use(Button).use(Cell).use(CellGroup).use(VanImage)

export default {
  name: 'Search',
  components: {
  },
  data() {
    return {
      friend: {
        _id: '',
        name: '',
        province: '',
        city: '',
        town: '',
        src: '',
        signature: ''
      }
    }
  },
  computed: {
    ...mapState(['userInfo', 'VchatInfo'])
  },
  created() {
    this.friend = this.$route.query
  },
  methods: {
    back() {
      window.history.go(-1)
    },
    // 在另外客户端接收到朋友请求,friendAndVchatRoomID 为自己的id和vchatId,可以查系统消息
    async addToConversations() {
      const params = {
        name: this.userInfo.name,
        time: parseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}'),
        nickname: this.userInfo.nickname,
        signature: this.userInfo.signature,
        read: [],
        userID: this.userInfo.id, // 自己的 id
        friendId: this.friend._id,
        vchatID: this.VchatInfo.id,
        friendName: this.friend.name,
        selfAndfriendRoomID: this.userInfo.id + '-' + this.friend._id,
        friendAndVchatRoomID: this.friend._id + '-' + this.VchatInfo.id, // friendAndVchatRoomID 在初始化已经加入会话了
        state: 'friend',
        type: 'validate',
        status: '0',
        validationMessage: `${this.userInfo.name}请求添加好友`
      }
      console.log(params)
      this.$socket.emit('sendVerificationMessage', params)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .mt-5 {
    margin-top: 5px;
  }
  .pt-5 {
    padding-top: 5px;
  }
  .list {
    padding-top: 46px;
  }
  .add {
    background-color: #f2f2f2;
  }
  .van-cell-group {
    background-color: #f2f2f2;
    .van-cell {
      background-color: #fff;
    }
  }

  .avatar {
    .van-cell__title {
      flex: 0 0 50px;
    }
  }
  .right {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 5px 0 5px 16px;
    overflow: hidden;
    .name {
      font-size: 16px;
      color: #333;
    }
    .desc {
      font-size: 12px;
      color: #666;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .center {
      text-align: center;
    }
  }
  .bg {
    height: 5px;
    background-color: #f2f2f2;
  }
</style>
