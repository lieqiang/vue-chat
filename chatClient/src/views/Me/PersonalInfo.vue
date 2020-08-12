<template>
  <div class="tab">
    <van-nav-bar
      left-arrow
      fixed
      left-text="个人信息"
      @click-left="back"
    />
    <div class="wrapper">
      <van-cell-group class="list">
        <van-cell center title="头像" is-link to="/EditAvatar">
          <template #default>
            <van-image
              round
              width="50"
              height="50"
              :src="userInfo.avatar"
            />
          </template>
        </van-cell>
        <van-cell title="昵称" is-link :value="userInfo.nickname" />
        <van-cell title="微信号" is-link :value="userInfo.name" />
        <van-cell title="性别" is-link :value="getSex" />
        <van-cell title="地区" is-link value="内容" />
        <van-cell title="个性签名" is-link :value="userInfo.signature" />
      </van-cell-group>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { NavBar, Icon, Cell, CellGroup, Toast, Image as VanImage } from 'vant'
Vue.use(NavBar).use(Icon).use(Cell).use(CellGroup).use(Toast).use(VanImage)
const map = {
  0: '男',
  1: '女',
  2: '保密'
}
export default {
  name: 'Me',
  data() {
    return {
      avatar: ''
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    getSex() {
      return map[this.userInfo.sex] || ''
    }
  },
  methods: {
    back() {
      window.history.go(-1)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .wrapper {
    position: fixed;
    top: 46px;
    bottom: 44px;
    left: 0;
    right: 0;
  }
</style>
