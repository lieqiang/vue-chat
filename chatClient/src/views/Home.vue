<template>
  <div>
    <van-nav-bar fixed left-text="聊天(10)">
      <template #right>
        <van-icon name="search" size="18" @click="search" />
        <van-icon name="add-o" size="18" class="ml-20" @click="isAddShow = true" />
      </template>
    </van-nav-bar>
    <div class="wrapper">
      <div class="content">
        <van-cell-group class="list">
          <van-cell center v-for="(item, index) in conversationsList" :key="index" @click="linkToChat(item)">
            <template #title>
              <van-image
                round
                width="50"
                height="50"
                :src="item.src"
              />
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
    <div v-show="isShow" class="fixed">
      <search
        @cancel="cancel"
      />
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
import Search from '@/components/Search'
import Add from '@/components/Add'
import { findMyfriends } from '@/api/user'
Vue.use(NavBar).use(Icon).use(Cell).use(CellGroup).use(Toast).use(VanImage)
export default {
  name: 'Home',
  components: {
    Search,
    Add
  },
  data() {
    return {
      isShow: false,
      isAddShow: false,
      conversationsList: []
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created() {
    this.findMyfriends()
  },
  mounted() {
    const wrapper = document.querySelector('.wrapper')
    const scroll = new BScroll(wrapper, { // eslint-disable-line
      click: true
    })
  },
  methods: {
    search() {
      this.isShow = true
    },
    cancel() {
      this.isShow = false
    },
    async findMyfriends() {
      const res = await findMyfriends({ userid: this.userInfo.id })
      if (res.data.error_code !== 0) {
        this.conversationsList = []
        return
      }
      this.conversationsList = res.data.data
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
  .wrapper {
    position: fixed;
    top: 46px;
    bottom: 44px;
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
