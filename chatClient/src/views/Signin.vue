<template>
  <div>
    <div class="chat">
      <img src="@/assets/default.jpg" alt="">
    </div>
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
    <div class="sumit">
      <van-button round block type="info" @click="submit">
        登录
      </van-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Field, Button, Toast } from 'vant'
import { Token } from '@/utils/token'
Vue.use(Field).use(Button).use(Toast)
export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      username: '',
      password: ''
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
      return true
    },
    async submit() {
      if (!this.validate()) {
        return false
      }
      const token = new Token(this.username, this.password)
      // 登录失败 需提示多个验证失败的提示
      token.verify(() => {
        Toast('登录成功')
        localStorage.setItem('username', this.username)
        this.$router.push({
          path: '/home'
        })
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .chat {
    text-align: center;
    padding: 40px 20px 20px 20px;
    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
  }
  .sumit {
    padding-top: 50px;
    margin: 16px;
  }
</style>
