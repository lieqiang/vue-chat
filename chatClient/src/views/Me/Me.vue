<template>
  <div class="tab">
    <van-cell-group class="list">
      <van-cell center is-link to="/personalInfo">
        <template #title>
          <van-image
            round
            width="50"
            height="50"
            :src="userInfo.avatar"
          />
        </template>
        <template #right-icon>
          <div class="right">
            <span class="name">{{ userInfo.nickname || userInfo.name }}</span>
            <span class="desc">{{ userInfo.signature }}</span>
          </div>
        </template>
      </van-cell>
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button type="default" block @click="loginout">退出</van-button>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { Icon, Cell, CellGroup, Toast, Image as VanImage, Button } from 'vant'
import { removeToken } from '@/utils/auth'
Vue.use(Icon).use(Cell).use(CellGroup).use(Toast).use(VanImage).use(Button)
export default {
  name: 'Me',
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    loginout() {
      removeToken()
      this.$store.dispatch('setUserInfo', {})
      this.$router.push({
        path: '/signin'
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
  flex-direction: column;
  flex: 1;
  padding: 5px 0 5px 16px;
  overflow: hidden;
}
</style>
