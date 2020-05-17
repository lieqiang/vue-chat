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
    <div style="margin: 16px;">
      <van-button round block type="info" @click="submit">
        提交
      </van-button>
    </div>
    <div style="margin: 16px;">
      <van-button round block type="info" @click="test">
        testtesttest
      </van-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Field, Button, Toast } from 'vant'
import { signup, test } from '@/api/user'
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
    submit() {
      if (!this.validate()) {
        return false
      }
      console.log('submit')
      const params = {
        username: this.username,
        password: this.password
      }
      signup(params).then((res) => {
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })
    },
    test() {
      test().then((res) => {
        console.log(res)
      })
    }
  }
}
</script>
