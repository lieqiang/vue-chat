<template>
  <div>
    <van-nav-bar fixed :left-text="`聊天(${list.length})`">
      <template #right>
        <!-- <van-icon name="search" size="18" @click="search" /> -->
        <van-icon name="add-o" size="18" class="ml-20" @click="isAddShow = true" />
      </template>
    </van-nav-bar>
    <div class="scroll-wrapper">
      <div class="content">
        <van-cell-group class="list">
          <van-cell center v-for="(item, index) in list" :key="index" @click="linkToChat(item)">
            <template #title>
              <div class="pos-r">
                <van-image
                  round
                  width="50"
                  height="50"
                  :src="getAvatar(item.avatar)"
                />
                <span class="info">{{ item.unReadCounts | countFilter }}</span>
              </div>
            </template>
            <template #right-icon>
              <div class="right">
                <span class="name">{{ item.nickname || item.name }}</span>
                <span class="desc">{{ item.signature }}</span>
              </div>
            </template>
          </van-cell>
        </van-cell-group>
      </div>
    </div>
    <div v-show="isAddShow" class="fixed">
      <add
        @cancel="isAddShow = false"
      />
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { NavBar, Icon, Cell, CellGroup, Toast, Image as VanImage } from 'vant'
import BScroll from '@better-scroll/core'
import Add from '@/components/Add'
Vue.use(NavBar).use(Icon).use(Cell).use(CellGroup).use(Toast).use(VanImage)
export default {
  name: 'Home',
  components: {
    Add
  },
  data() {
    return {
      isAddShow: false,
      list: [],
      totalUnReadMsgCount: 0
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'root',
      'addressBooksList',
      'unReadMsgCountList'
    ])
  },
  watch: {
    addressBooksList(newList, oldList) {
      this.list = newList.filter(item => item.isInChatChannels)
    }
  },
  created() {
    this.list = this.addressBooksList.filter(item => item.isInChatChannels)
  },
  mounted() {
    const wrapper = document.querySelector('.scroll-wrapper')
    const scroll = new BScroll(wrapper, { // eslint-disable-line
      click: true
    })
  },
  methods: {
    getAvatar(avatar) {
      if (avatar) {
        return `${this.root}${avatar}`
      }
      return require('@/assets/default.jpg')
    },
    linkToChat(item) {
      const { roomid, nickname } = item
      this.$router.push({
        path: '/chat',
        query: {
          roomid,
          nickname
        }
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .ml-20 {
    margin-left: 20px;
  }
  .scroll-wrapper {
    position: fixed;
    top: 46px;
    bottom: 52px;
    left: 0;
    right: 0;
  }
  .van-cell {
    &:hover, &:active {
      background-color: #F2F2F2;
    }
  }
  .van-cell__title {
    flex: 0 0 50px;
  }
  .pos-r {
    position: relative;
  }
  .info {
    position: absolute;
    top: 0;
    right: 0;
    box-sizing: border-box;
    min-width: 16px;
    padding: 0 3px;
    color: #fff;
    font-size: 12px;
    line-height: 1.2;
    text-align: center;
    background-color: #ee0a24;
    border-radius: 16px;
    transform: translate(30%, -30%);
    transform-origin: 100%;
  }
  .right {
    display: flex;
    flex-direction: column;
    flex: 1;
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
  .fixed {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 999;
    background-color: #f2f2f2;
  }
</style>
