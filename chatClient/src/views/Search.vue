<template>
  <div>
    <van-nav-bar
      fixed
      left-text="添加朋友"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div class="main-content">
      <add :isShowAction="false" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { NavBar } from 'vant'
import Add from '@/components/Add'

Vue.use(NavBar)
export default {
  name: 'Search',
  components: {
    Add
  },
  data() {
    return {}
  }
}
</script>
