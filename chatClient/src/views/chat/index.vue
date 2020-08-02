<template>
  <div :style="{'width': deviceWidth, 'margin': '0 auto'}" class="main-content">
    <div class="service-page">
      <van-nav-bar left-text="返回" @click-left="back">
        <template #title>
          <span>王麻子</span>
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
              :class="{mine: item.op_id === 0, other: item.op_id !== 0, center: item.info == 1, recall: item.op_id === 'cancel'}"
            >
              <div class="info-time">{{ item.time | timeFilter('MDHM') }}</div>
              <div class="other-desc">
                <div v-show="item.op_id !== 'cancel' && item.op_id != '966530'" class="other-face">
                  <span :class="[item.op_id === 0 ? 'user-avatar' : 'mine-avatar', 'chat-avatar']"/>
                </div>
                <span class="other-info" @contextmenu="stop">
                  <msg-item :item="item" :quesid="questionInfo.quesid" @image-view-change="showImageView"/>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 工具条 -->
      <div v-show="questionInfo.sts != 2" :style="{'width': deviceWidth, 'margin': '0 auto', 'bottom': isFaceShow ? '189px' : '0'}" class="chat-container-footer">
        <div :class="[deviceWidth === '750px' ? 'pc-bd pc-b-t' : 'b-t']" class="chat-bottom-bar" @click.stop="stop">
          <div :class="[deviceWidth === '750px' ? 'pc-b-b' : 'b-b']" class="bar-left">
            <input ref="input" v-model="chatText" type="text" class="msg-input" @focus.stop="focus">
          </div>
          <div class="bar-emoji" @click="changeFaceStatus">
            <svg-icon icon-class="face" class="face-icon" />
          </div>
          <div class="bar-img">
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
          <div :class="{ 'no-btn': !isSendBtnShow }" class="submit-btn">
            <van-button v-show="isSendBtnShow" class="send-btn" size="mini" type="danger" @click="sendMsg">发送</van-button>
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
    <div v-if="uploding" class="img-loading">
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
import { NavBar, Toast, Button, Loading } from 'vant'
import msgItem from './msgItem'
import Face from '@/components/face'
import { EMOJI_LIST } from '@/utils/face'
BScroll.use(PullDown)
Vue.use(Viewer)
Vue.use(Toast).use(NavBar).use(Button).use(Loading)
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
      uploding: false,
      height: '100%',
      viewer: null,
      msgList: [
        {
          message: '按照此前我们报道过的消息，今年的iPhone12系列采用A14处理器已经毫无悬念。该处理器将会使用台积电5nm工艺，而新一代的iPad/iPad Pro则大概率会用上A14X处理器，Apple Watch方面的话，，则是最新的S6处理器。',
          time: 1588668720014,
          ques_id: 201909260661,
          op_id: 0,
          id: 201909260343
        },
        {
          message: '_fb10_fa4_fa4_fb11_fb11',
          time: 1588568720014,
          img: null,
          ques_id: 201909260661,
          op_id: 0,
          id: 201909260344
        },
        {
          message: '原标题：苹果A18处理器曝光，将采用2nm工艺苹果公司在CPU上的研发进度一直以来都领先着整个手机行业，尤其是在先进工艺的采用方面。除了今年的A14处理器会用上5nm工艺外，根据最新消息透露，未来几年苹果的CPU路线图已经制定完成，如无意外的话，2024年就可以看到2nm工艺的A18处理器了，而这几年中苹果处理器的IPC将会每年上升15-30%。',
          time: 1588668730014,
          img: null,
          ques_id: 201909260661,
          op_id: 1,
          id: 201909260345
        },
        {
          message: '为了满足这些场景，它不仅支持惯性滚动、边界回弹、滚动条淡入淡出等效果的灵活配置，让滚动更加流畅，同时还提供了很多 API 方法和事件，以便我们更快地实现滚动场景下的需求，如下拉刷新、上拉加载。由于它基于原生 JavaScript 实现，不依赖任何框架，所以既可以原生 JavaScript 引用，也可以与目前前端 MVVM 框架结合使用，比如，其官网上的示例就是与 Vue 的结合。',
          time: 1588668730014,
          img: null,
          ques_id: 201909260661,
          op_id: 1,
          id: 201909260345
        }
      ],
      scroll: null,
      beforePullDown: true,
      isPullingDown: false,
      isInit: true,
      isFaceShow: false,
      reg: /(^\s*)|(\s*$)/g,
      txtReg: /\[[^(\)|\[)]*\]+?$/, // eslint-disable-line
      isSendBtnShow: false,
      // 新增
      roomid: ''
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
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
        this.refresh()
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
    const { roomid } = this.$route.query
    this.roomid = roomid
    // this.getHistoryMsg(roomid)
  },
  mounted() {
    this.$nextTick(() => {
      this.calculateHeight()
      this.initScroll()
    })
  },
  sockets: {
    connect() {
      // 获取每台客服端生成的id
      this.websocketid = this.$socket.id
      console.log('链接服务器')
    },
    // 监听断开连接，函数
    disconnect() {
      console.log('断开服务器连接')
    },
    receivingMsg(params) {
      console.log('aa', params)
      this.msgList.push(params)
    }
  },
  methods: {
    back() {
      window.history.go(-1)
    },
    emitEvent() {
      this.$socket.emit('otherevent', 'from client')
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
    handleSelectFace(id) {
      this.chatText = this.chatText + '[' + id + ']' // 服务器发送内容
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
      const newChatText = JSON.parse(JSON.stringify(this.chatText))
      let text = newChatText.replace(/\[|]/g, '') // eslint-disable-line
      text = text.replace(/<+/gim, '&lt;')
      text = text.replace(/>+/gim, '&gt;')
      text = text.replace(/\n+/gim, '<br />')
      // socket
      const params = {
        message: text,
        name: this.userInfo.name,
        nickname: this.userInfo.nickname,
        roomid: this.roomid,
        senderID: this.userInfo.id,
        style: 'txt',
        read: [this.userInfo.name],
        time: new Date().getTime()
      }
      this.$socket.emit('sendMsg', params)
      debugger
    },
    triggerUpload() {
      this.$refs.uploadPic.click()
    },
    handleChange(e) {
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
      this.uploding = true
      const param = new FormData()
      param.append('file', files[0])
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
        width: 20px;
        height: 20px;
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
        .mine-avatar {
          background: url(../../assets/mine.jpg) no-repeat;
          background-size: contain;
        }
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
        .user-avatar {
          background: url(../../assets/user.jpg) no-repeat;
          background-size: cover;
        }
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
  .submit-btn {
    text-align: center;
    cursor: pointer;
    font-size: 12px;
    height: 25px;
    text-align: center;
    line-height: 25px;
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
@media screen and (max-width: 767px) {
  .other-info {
    max-width: 100%;
    flex: 1;
  }
}
.user-select {
  user-select: none;
}
.postionRelative {
  position: relative;
}

.bar-left {
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
  margin-left: 5px;
}
.bar-img {
  width: 25px;
  margin-left: 4px;
  height: 25px;
  margin-top: 2px;
  margin-left: 4px;
}
.van-icon-add-o {
  font-size: 23px;
  color:#bfcbd9;
}
.submit-btn {
  margin: 0 10px 0 5px;
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
