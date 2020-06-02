<template>
  <div>
    <van-field
      v-model="username"
      name="用户名"
      label="用户名"
      placeholder="请输入用户名"
    />
    <van-field
      v-model="password"
      type="password"
      name="密码"
      label="密码"
      placeholder="请输入6-18位密码"
    />
    <van-field
      v-model="confirmPassword"
      type="password"
      name="确认密码"
      label="确认密码"
      placeholder="请再次输入密码"
    />
    <div class="submit">
      <van-button round block type="info" @click="submit">
        提交
      </van-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Field, Button, Toast } from 'vant'
import { signup } from '@/api/user'
Vue.use(Field).use(Button).use(Toast)
export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      username: '',
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    validate() {
      if (!this.username) {
        Toast('请输入用户名')
        return false
      }
      if (!this.password) {
        Toast('请输入密码')
        return false
      }
      if (!this.confirmPassword) {
        Toast('请输入确认密码')
        return false
      }
      if (this.password !== this.confirmPassword) {
        Toast('两次输入密码不一致')
        return false
      }
      return true
    },
    async submit() {
      if (!this.validate()) {
        return false
      }
      console.log('submit')
      const params = {
        username: this.username,
        password: this.password
      }
      const res = await signup(params)
      if (res.data.error_code !== 0) {
        Toast(res.data.msg)
        return
      }
      Toast('注册成功')
      setTimeout(() => {
        this.$router.push({
          path: '/signin'
        })
      }, 1000)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .sumit {
    padding-top: 30px;
    max-width: 90%;
    margin: 0 auto;
  }
</style>
