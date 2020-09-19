<template>
  <div>
    <van-nav-bar fixed left-arrow @click-left="$router.go(-1)">
      <template #right>
        <van-button type="primary" size="small" @click="sendValidation">发送</van-button>
      </template>
    </van-nav-bar>
    <div class="fixed">
      <h5 class="tit">发送添加朋友申请</h5>
      <div class="field">
        <textarea placeholder="验证消息" v-model="validationMessage"/>
      </div>
      <h5 class="tit">设置备注</h5>
      <div class="field">
        <textarea placeholder="备注" v-model="remarks"/>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { NavBar, Button, Toast } from 'vant'
import { mapGetters } from 'vuex'
Vue.use(NavBar)
Vue.use(Button)
Vue.use(Toast)

export default {
  name: 'SendValidate',
  sockets: {
    sendVerificationSuccess() {
      Toast('发送申请成功')
      this.$router.go(-1)
    }
  },
  components: {
  },
  data() {
    return {
      validationMessage: localStorage.getItem('validationMessage') || '',
      remarks: ''
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'VchatInfo', 'root'])
  },
  created() {
    this.friendInfo = this.$route.query
    this.remarks = this.friendInfo.nickname
  },
  methods: {
    async sendValidation() {
      const params = {
        roomid: this.userInfo.id + '-' + this.friendInfo._id,
        senderID: this.userInfo.id,
        senderName: this.userInfo.name,
        senderNickname: this.userInfo.nickname,
        senderSignature: this.userInfo.signature,
        senderAvatar: this.userInfo.avatar.replace(new RegExp(this.root, 'g'), ''),
        receiverID: this.friendInfo._id,
        vchatID: this.VchatInfo.id,
        receiverName: this.friendInfo.name,
        receiverNickname: this.friendInfo.nickname,
        receiverSystemRoomID: this.friendInfo._id + '-' + this.VchatInfo.id,
        receiverAvatar: this.friendInfo.avatar,
        read: [],
        state: 'friendInfo',
        type: 'validate',
        status: '0',
        validationMessage: this.validationMessage,
        remarks: this.remarks,
        time: new Date().getTime()
      }
      this.$socket.emit('sendVerificationMessage', params, this.VchatInfo.roomid)
      this.validationMessage && localStorage.setItem('validationMessage', this.validationMessage)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .fixed {
    position: fixed;
    top: 46px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow-x: auto;
  }
  .tit {
    padding: 15px 16px 0;
    color: rgba(69, 90, 100, 0.6);
    font-weight: normal;
    font-size: 14px;
  }
  .field {
    position: relative;
    display: flex;
    box-sizing: border-box;
    width: 100%;
    padding: 10px 16px;
    overflow: hidden;
    color: #323233;
    font-size: 14px;
    line-height: 24px;
    background-color: #fff;
    textarea {
      height: 60px;
      width: 100%;
      padding: 10px;
      border: 0;
      border-radius: 10px;
      color: #323233;
      resize: none;
      background-color: #f2f2f2;
    }
  }
</style>
