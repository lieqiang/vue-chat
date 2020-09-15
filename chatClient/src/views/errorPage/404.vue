<template>
  <div>
    <van-empty image="error" description="额,页面走丢了" />
  </div>
</template>

<script>
import Vue from 'vue'
import { Empty } from 'vant'

Vue.use(Empty)
export default {
  name: 'Page404'
}
</script>
