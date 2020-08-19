<template>
  <div :style="{'width': deviceWidth, 'margin': '0 auto'}" class="main-content">
    <div class="service-page">
      <van-nav-bar left-arrow @click-left="back">
        <template #title>
          <span>{{ nickname }}</span>
        </template>
      </van-nav-bar>
      <div :style="{ height: height + 'px' }" class="chat-container" @click="slideup">
        <div ref="wrapper" :style="{ height: height + 'px' }" :class="{'pc-bd': deviceWidth === '750px'}" class="chat-container-body" @touchstart="start" @touchend="end">
          <div v-if="isMsgLoadingShow" class="loading">
            <van-loading color="#1989fa" />
          </div>
          <div ref="scrollContainer" class="scroll-container pb-20">
            <div class="pulldown-scroller">
              <div class="pulldown-wrapper">
                <div v-show="beforePullDown">
                  <span>Pull Down and refresh</span>
                </div>
                <div v-show="!beforePullDown">
                  <div v-show="isPullingDown">
                    <span>Loading...</span>
                  </div>
                  <div v-show="!isPullingDown"><span>Refresh success</span></div>
                </div>
              </div>
            </div>
            <div
              v-for="(item,index) in msgList"
              :key="index"
              :ref="'d' + item.id"
              :class="{mine: item.senderID === userInfo.id, other: item.senderID !== userInfo.id, center: item.info == 1}"
            >
              <div class="info-time">{{ item.time | timeFilter('MDHM') }}</div>
              <div class="other-desc">
                <div v-show="item.senderID !== 'cancel' && item.senderID != '966530'" class="other-face">
                  <span :class="[item.senderID !== userInfo.id ? 'user-avatar' : 'mine-avatar', 'chat-avatar']">
                    <img :src="`${root}${item.avatar}`" />
                  </span>
                </div>
                <span class="other-info" @contextmenu="stop">
                  <msg-item :item="item" :quesid="questionInfo.quesid" @image-view-change="showImageView"/>
                </span>
              </div>
            </div>
            <van-empty
              v-show="!msgList.length"
              description="暂无消息,快快聊天吧-_-"
            />
          </div>
        </div>
      </div>
      <!-- 工具条 -->
      <div v-show="questionInfo.sts != 2" :style="{'width': deviceWidth, 'margin': '0 auto', 'bottom': isFaceShow ? '189px' : '0'}" class="chat-container-footer">
        <div :class="[deviceWidth === '750px' ? 'pc-bd pc-b-t' : 'b-t']" class="chat-bottom-bar" @click.stop="stop">
          <div :class="[deviceWidth === '750px' ? 'pc-b-b' : 'b-b']" class="msg-input-wrap">
            <input ref="input" v-model="chatText" type="text" class="msg-input" @focus.stop="focus">
          </div>
          <div class="bar-emoji" @click="changeFaceStatus">
            <svg-icon icon-class="face" class="face-icon" />
          </div>
          <div class="bar-send-img">
            <van-icon name="add-o" @click="triggerUpload">
              <input
                id="uploadPic"
                ref="uploadPic"
                type="file"
                style="display:none"
                accept="image/*"
                @change="handleChange($event)"
              >
            </van-icon>
          </div>
          <div :class="{ 'no-btn': !isSendBtnShow }" class="send-msg-wrap">
            <van-button v-show="isSendBtnShow" class="send-msg-btn" size="mini" type="danger" @click="sendMsg">发送</van-button>
          </div>
        </div>
      </div>
      <!-- 工具条 -->
    </div>
    <div v-viewer="{ navbar: false }" id="view-images" style="display: none;">
      <img :src="imgSrc">
    </div>
    <div :style="{'width': deviceWidth, 'margin': '0 auto', 'bottom': isFaceShow ? '0' : '-189px'}" :class="{'pc-bd': deviceWidth === '750px'}" class="face b-t" @click.stop="stop">
      <face @face-change="handleSelectFace" @delete-text="deleteText"/>
    </div>
    <div v-if="uploading" class="img-loading">
      <van-loading color="#1989fa" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { PopupMixin } from '@/mixins/width'
import BScroll from '@better-scroll/core'
import PullDown from '@better-scroll/pull-down'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
import { NavBar, Toast, Button, Loading, Empty } from 'vant'
import msgItem from './msgItem'
import Face from '@/components/face'
import { EMOJI_LIST } from '@/utils/face'
import { getHistoryMsg } from '@/api/message'
import { uploadImg } from '@/api/upload'
BScroll.use(PullDown)
Vue.use(Viewer)
Vue.use(Toast).use(NavBar).use(Button).use(Loading).use(Empty)
const TIME_BOUNCE = 800
const THRESHOLD = 70
const STOP = 56
export default {
  components: {
    msgItem,
    Face
  },
  mixins: [PopupMixin],
  data: function() {
    return {
      questionInfo: {},
      face: EMOJI_LIST,
      chatText: '',
      isMsgLoadingShow: false,
      imgSrc: '',
      uploading: false,
      height: '100%',
      viewer: null,
      msgList: [],
      scroll: null,
      beforePullDown: true,
      isPullingDown: false,
      isInit: true,
      isFaceShow: false,
      reg: /(^\s*)|(\s*$)/g,
      txtReg: /\[[^(\)|\[)]*\]+?$/, // eslint-disable-line
      isSendBtnShow: false,
      roomid: '',
      nickname: ''
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'root'])
  },
  watch: {
    chatText(n, o) {
      if (this.chatText.replace(this.reg, '') === '') {
        this.isSendBtnShow = false
        return
      }
      if (!this.isSendBtnShow) {
        this.isSendBtnShow = true
      }
    },
    msgList() {
      if (!this.isInit) {
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      }
    },
    isFaceShow(current, prev) {
      this.calculateHeight()
      this.$nextTick(() => { // 顺序不能乱
        this.scroll.refresh() // 必须
        this.scroll.scrollTo(0, this.scroll.maxScrollY, 0)
      })
      window.scrollTo(0, document.documentElement.clientHeight || document.body.clientHeight) // 兼容ios
    }
  },
  created() {
    const { roomid, nickname } = this.$route.query
    this.roomid = roomid
    this.nickname = nickname
    this.getHistoryMsg(roomid)
  },
  mounted() {
    this.$nextTick(() => {
      this.calculateHeight()
    })
  },
  sockets: {
    receivingMsg(params) {
      console.log('收到新消息', params)
      this.msgList.push(params)
    },
    sendMsgSuccess(params) {
      console.log('发送消息成功', params)
      this.chatText = ''
      this.msgList.push(params)
      this.$nextTick(() => {
        this.scroll.refresh()
        this.scroll.scrollTo(0, this.scroll.maxScrollY, 0)
      })
    }
  },
  methods: {
    async getHistoryMsg(roomid) {
      const res = await getHistoryMsg({ roomid })
      if (res.data.error_code !== 0) {
        Toast(res.data.msg)
        return
      }
      this.msgList = res.data.data
      this.$nextTick(() => {
        this.initScroll()
      })
    },
    back() {
      window.history.go(-1)
    },
    iosResizeHandle() {
      const msgInputDom = document.querySelector('.msg-input')
      msgInputDom.addEventListener('blur', () => {
        console.log('IOS blur')
        const wechatInfo = window.navigator.userAgent.match(/MicroMessenger/i)
        if (!wechatInfo) return
        setTimeout(() => { // fix ios wechat bug
          window.scrollTo(0, 0)
        }, 100)
        this.scroll.scrollTo(0, this.scroll.maxScrollY, 0)
      })
    },
    androidResizeHandle() {
      window.addEventListener('resize', () => {
        if (this.$route.path === '/questions/questions') {
          this.calculateHeight()
          this.$nextTick(() => {
            this.scroll.refresh() // 必须
            this.scroll.scrollTo(0, this.scroll.maxScrollY, 0)
          })
        }
      }, false)
    },
    slideup() {
      if (this.isFaceShow) {
        this.isFaceShow = false
      }
      this.$refs.input.blur()
    },
    start(e) {
      e.preventDefault()
      if (this.isFaceShow) {
        this.scroll.disable()
      }
    },
    end() {
      if (this.isFaceShow) {
        this.isFaceShow = false
        this.scroll.enable()
      }
    },
    // addNewMsg(newMsg) {
    //   this.msgList.push(newMsg)
    //   this.$nextTick(() => {
    //     this.scroll.refresh() // 必须
    //     this.scroll.scrollTo(0, this.scroll.maxScrollY, 0)
    //   })
    // },
    showImageView(src) {
      this.imgSrc = src
      const viewer = this.$el.querySelector('#view-images').$viewer
      setTimeout(() => {
        viewer.show()
      }, 100)
    },
    stop(event) {},
    calculateHeight() {
      const windowClientHeight = document.documentElement.clientHeight || document.body.clientHeight
      this.height = windowClientHeight - 47 - (this.isFaceShow ? 189 : 0) - 46
    },
    initScroll() {
      const wrapper = this.$refs.wrapper
      this.$nextTick(() => {
        this.scroll = new BScroll(wrapper, {
          click: true,
          mouseWheel: true,
          scrollY: true,
          bounceTime: TIME_BOUNCE, // 设置回弹动画的动画时长
          pullDownRefresh: {
            threshold: THRESHOLD, // 配置顶部下拉的距离来决定刷新时机
            stop: STOP // 回弹停留的距离
          }
        })
        this.scroll.scrollTo(0, this.scroll.maxScrollY, 0)
        this.isInit = false // 第一次不监听消息变化
        this.bindSrollEvent()
      })
    },
    bindSrollEvent() {
      this.scroll.on('pullingDown', () => {
        this.beforePullDown = false
        this.isPullingDown = true
        setTimeout(() => {
          this.isPullingDown = false
          this.scroll.finishPullDown()
        }, 500)
        setTimeout(() => {
          this.beforePullDown = true
          this.scroll.refresh()
        }, TIME_BOUNCE)
      })
    },
    refresh() {
      this.scroll.refresh()
    },
    scrollTo(y, time) {
      this.scroll.scrollTo(0, y, time)
    },
    // finishPullDown() {
    //   this.scroll.finishPullDown()
    // },
    focus() {
      if (this.isFaceShow) {
        this.isFaceShow = false
      }
    },
    handleSelectFace(item) {
      this.chatText = this.chatText + '[' + item.txt + ']' // 服务器发送内容
    },
    deleteText() {
      if (!this.chatText) {
        return
      }
      if (this.txtReg.test(this.chatText)) { // 如果字符串最后匹配到中括号
        const lastIndex = this.chatText.lastIndexOf('[')
        const lastIndex2 = this.chatText.lastIndexOf(']')
        if ((lastIndex2 - 1) - lastIndex === 4 || (lastIndex2 - 1) - lastIndex === 5) { // 删除表情
          this.chatText = this.chatText.replace(this.txtReg, '')
        } else {
          this.chatText = this.chatText.substr(0, this.chatText.length - 1)
        }
      } else {
        this.chatText = this.chatText.substr(0, this.chatText.length - 1)
      }
    },
    sendMsg() {
      if (this.chatText.replace(this.reg, '') === '') {
        Toast('消息不能为空')
        this.chatText = ''
        return
      }
      if (this.chatText.length > 300) {
        Toast('单次聊天内容文字长度不能超过300字')
        return
      }
      let text = JSON.parse(JSON.stringify(this.chatText))
      const reg1 = /\[[\u4e00-\u9fa5_a-zA-Z]+\]/g
      const reg2 = /\[[\u4e00-\u9fa5_a-zA-Z]+\]/
      const matchedGroup = text.match(reg1)
      if (matchedGroup && matchedGroup.length > 0) {
        for (var i = 0; i < matchedGroup.length; i++) {
          for (var j = 0; j < this.face.length; j++) {
            if (matchedGroup[i] === `[${this.face[j].txt}]`) {
              text = text.replace(reg2, this.face[j].reg)
              break
            }
          }
        }
      }
      text = text.replace(/<+/gim, '&lt;')
      text = text.replace(/>+/gim, '&gt;')
      text = text.replace(/\n+/gim, '<br />')
      const params = {
        message: text,
        name: this.userInfo.name,
        nickname: this.userInfo.nickname,
        avatar: this.userInfo.avatar.replace(new RegExp(this.root, 'g'), ''),
        roomid: this.roomid,
        senderID: this.userInfo.id,
        msgType: 'txt',
        read: [this.userInfo.name],
        time: new Date().getTime()
      }
      this.$socket.emit('sendMsg', params)
    },
    triggerUpload() {
      this.$refs.uploadPic.click()
    },
    async handleChange(e) {
      if (!e.target.files.length) {
        return
      }
      var files = e.target.files
      const maxSize = 5 * 1024 * 1024
      if (files[0].size > maxSize) {
        Toast('图片大小不能超过5M')
        this.$refs.uploadPic.value = ''
        return
      }
      this.uploading = true
      const formData = new FormData()
      formData.append('file', files[0])
      const res = await uploadImg(formData)
      this.uploading = false
      if (!res.error_code === 0) {
        this.$refs.uploadPic.value = ''
        return Toast('发送图片失败-_-')
      }
      const params = {
        message: res.data.data,
        name: this.userInfo.name,
        nickname: this.userInfo.nickname,
        avatar: this.userInfo.avatar.replace(new RegExp(this.root, 'g'), ''),
        roomid: this.roomid,
        senderID: this.userInfo.id,
        msgType: 'img',
        read: [this.userInfo.name],
        time: new Date().getTime()
      }
      this.$socket.emit('sendMsg', params)
    },
    changeFaceStatus() {
      this.isFaceShow = !this.isFaceShow
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import '../../styles/face.scss';
  .chat-container-body {
    background-color: #eee;
  }
  .pulldown-wrapper {
    position: absolute;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    transform: translateY(-100%) translateZ(0);
    text-align: center;
    color: #999
  }
  .mine {
    .other-info {
      margin-left: 45px;
      text-align: right;
      /deep/ .item-txt {
        text-align: left;
      }
    }
  }
  .other {
    .other-info {
      margin-right: 45px;
      text-align: left;
      /deep/ .item-txt {
        text-align: left;
      }
    }
  }
  .other-info {
    position: relative;
    /deep/ .item-txt {
      display: inline-block;
      word-break: break-all;
      border-radius: 5px;
      max-width: 100%;
      font-size: 14px;
      padding: 9px 8px;
      position: relative;
      /deep/ .iconf {
        width: 22px;
        height: 22px;
      }
    }
    /deep/ img {
      max-width: 100%;
      cursor: pointer;
    }
  }
  .chat-avatar {
    display: inline-block;
    width: 40px;
    height: 40px;
    img {
      width: 40px;
      height: 40px;
    }
  }
  .other {
    padding: 10px;
    .info-time {
      font-size: 12px;
      color: #999;
      text-align: center;
      padding-bottom: 8px;
    }
    .other-desc {
      flex: 1;
      display: flex;
      justify-content: flex-start;
      .other-face {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
        font-size: 12px;
        display: flex;
        flex: 0 0 40px;
        align-items: center;
        justify-content: center;
        // .user-avatar {
        //   // background: url(../../assets/user.jpg) no-repeat;
        //   background-size: contain;
        // }
      }
    }
    .other-info {
      /deep/ .item-txt {
        background: #fff;
        color: #000;
      }
      margin-left: 10px;
      &.voice-play {
        width: 80px;
        height: 30px;
        cursor: pointer;
        line-height: 24px;
        text-align: center;
        &:hover {
          background: #ccc;
        }
      }
      /deep/ .image {
        display: block;
        max-width: 150px;
        cursor: pointer;
      }
      /deep/ .images {
        display: block;
        img {
          display: inline-block;
          width: 120px;
          margin: 5px 5px 0 0;
          height: 180px;
        }
      }
    }
  }
  .mine {
    padding: 10px;
    .info-time {
      font-size: 12px;
      color: #999;
      text-align: center;
      padding-bottom: 8px;
    }
    .other-desc {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      .other-face {
        order: 1;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
        font-size: 12px;
        display: flex;
        flex: 0 0 40px;
        align-items: center;
        justify-content: center;
        // .mine-avatar {
        //   // background: url(../../assets/mine.jpg) no-repeat;
        //   // background-size: cover;
        // }
      }
    }
    .other-info {
      /deep/ .item-txt {
        background-color: #b2e281;
        color: #000;
      }
      /deep/ .images {
        display: block;
        img {
          vertical-align: bottom;
        }
      }
      margin-right: 10px;
      /deep/ .image {
        display: block;
        cursor: pointer;
        max-width: 150px;
      }
    }
  }
  .center {
    justify-content: center;
    margin-bottom: 20px;
    .center-info {
      background: #eeeeee;
      padding: 5px 10px;
      font-size: 14px;
    }
  }
  .recall {
    padding: 10px 13px 0 13px;
    margin-right: 0;
    .other-info {
      width: 100%;
      min-height: 25px;
      max-width: 100% !important;
      background: none;
      text-align: center !important;
      margin-right: 0 !important;
      margin-left: 0 !important;
    }
    /deep/ .re-edit {
      font-size: 12px;
      padding-left: 5px;
      color: #e51c23;
      &:hover {
        text-decoration: underline;
      }
    }
    /deep/ .re-edit-txt {
      font-size: 12px;
      color: #555;
    }
    /deep/ .txt-link {
      font-size: 12px;
      color: #e51c23;
      text-decoration: underline;
    }
  }
.service-page {
  position: relative;
  background-color: #fff;
  .chat-container {
    flex-grow: 1;
    color: #2d2f33;
    position: relative;
    .chat-container-body {
      overflow: hidden;
    }
  }
}
.chat-container-footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  background: #fff;
  .chat-bottom-bar {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    background: #fff;
    height: 47px;
    color: #5e6d82;
    i {
      &:hover {
        color: #409eff;
        cursor: pointer;
      }
      &:active {
        color: #409eff;
        cursor: pointer;
      }
    }
  }
  .send-msg-wrap {
    text-align: center;
    cursor: pointer;
    font-size: 12px;
    height: 25px;
    text-align: center;
    line-height: 25px;
    margin: 0 10px 0 5px;
  }
}
.pb-20 {
  padding-bottom: 20px;
}
.bar-emoji {
  .face-icon {
    fill: #b1bac2;
    &:hover, &:active {
      fill: #409eff;
      cursor: pointer;
    }
  }
}
.pt-10 {
  padding-top: 10px;
}
.send-type {
  margin-bottom: 5px;
  width: 165px;
  height: 71px;
  overflow: hidden;
  padding: 0;
  /deep/ .el-dropdown-menu__item {
    padding: 2px 17px;
  }
  /deep/ .el-dropdown-menu__item.active {
    color: #fff;
    background-color: #e51c23;
  }
}
.history-dialog {
  /deep/ .el-dialog__body {
    padding: 0 10px 25px 10px;
  }
}
.red {
  color: #e51c23;
}
// 适配
.qus-list-icon, .user-icon {
  fill: #666;
}
.qus-list-icon {
  font-size: 24px;
}
.user-icon {
  font-size: 20px;
}
.mask {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 0;
}
.user-select {
  user-select: none;
}
.postionRelative {
  position: relative;
}

.msg-input-wrap {
  flex: 1;
  padding-bottom: 5px;
  .msg-input {
    width: 100%;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    padding-left: 10px;
    border: none;
    outline: none;
  }
}
.bar-emoji {
  width: 25px;
  display: flex;
  align-items: center;
  margin-left: 5px;
}
.bar-send-img {
  width: 25px;
  display: flex;
  align-items: center;
  margin-left: 4px;
  height: 25px;
  margin-left: 4px;
}
.van-icon-add-o {
  font-size: 23px;
  color:#bfcbd9;
}
.no-btn {
  margin: 0 8px 0 0;
}
.face-icon {
  font-size: 25px;
}
.img-add {
  font-size: 23px;
  color: rgb(191, 203, 217);
}

.loadMore {
  position: absolute;
  z-index: 0;
  top: -28px;
  width: 100%;
  font-size: 14px;
  color: rgb(102, 102, 102);
  span {
    line-height: 22px;
  }
}

.face {
  position: fixed;
  left: 0;
  right: 0;
  box-sizing: border-box;
  background-color: #fff;
}

.loading {
  position: fixed;
  z-index: 9999;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.img-loading {
  height: 47px;
  position: fixed;
  z-index: 9999;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
