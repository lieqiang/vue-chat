<template>
  <div>
    <van-nav-bar
      left-arrow
      fixed
      left-text="更改名字"
      @click-left="$router.go(-1)"
    >
      <template #right>
        <van-button type="primary" size="small" @click="save">保存</van-button>
      </template>
    </van-nav-bar>
    <div class="main-content">
      <van-cell-group>
        <van-field v-model="nickname" placeholder="请输入昵称" />
      </van-cell-group>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { NavBar, CellGroup, Field, Button, Toast } from 'vant'
import { updateUserInfo } from '@/api/user'
Vue.use(NavBar).use(Field).use(CellGroup).use(Button).use(Toast)
export default {
  name: 'EditNickname',
  data() {
    return {
      nickname: ''
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created() {
    this.nickname = this.userInfo.nickname
  },
  methods: {
    async save(e) {
      const params = {
        name: this.userInfo.name,
        field: {
          nickname: this.nickname
        }
      }
      const response = await updateUserInfo(params)
      if (!response.error_code === 0) {
        return Toast('修改昵称失败-_-')
      }
      this.$store.dispatch('updateUserInfo', { nickname: this.nickname })
      this.$router.push({
        path: '/PersonalInfo'
      })
    }
  }
}
</script>
