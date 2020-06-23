<template>
  <div class="tab">
    <router-link tag="div" class="tab-item" to="/home">
      <span class="tab-icon">
        <van-icon :color="activeColor('/home')" name="chat-o" size="20" badge="10" />
      </span>
      <span class="tab-link">聊天</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/addressBooks">
      <span class="tab-icon">
        <van-icon :color="activeColor('/addressBooks')" name="friends-o" size="20" :badge="count" />
      </span>
      <span class="tab-link">通讯录</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/me">
      <span class="tab-icon">
        <van-icon :color="activeColor('/me')" name="contact" size="20" />
      </span>
      <span class="tab-link">我</span>
    </router-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Icon } from 'vant'
import Vue from 'vue'
Vue.use(Icon)
export default {
  data() {
    return {
      count: ''
    }
  },
  computed: {
    ...mapGetters(['adressBooksMessages'])
  },
  watch: {
    adressBooksMessages(newVal, oldVal) {
      if (!newVal.length) {
        this.count = ''
        return
      }
      this.count = newVal.length > 100 ? '99+' : newVal.length
    }
  },
  methods: {
    activeColor(name) {
      const { path } = this.$route
      if (path === name) {
        return '#07c160'
      }
      return ''
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .tab {
    display: flex;
    height: 50px;
    font-size: 12px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    background-color: #f6f6f6;
    z-index: 999;
    .tab-item{
      flex: 1;
      text-align: center;
      .tab-link {
        padding-bottom: 5px;
        color: #666;
      }
      .tab-icon, .tab-link {
        display: block;
      }
      .tab-icon {
        margin-top: 6px;
      }
    }
    .router-link-active {
      .tab-link {
        color: #07c160;
      }
    }
  }
</style>
