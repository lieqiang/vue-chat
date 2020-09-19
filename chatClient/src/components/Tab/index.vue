<template>
  <div class="tab van-hairline--top-bottom">
    <router-link tag="div" class="tab-item" to="/home">
      <span class="tab-icon">
        <van-icon :color="activeColor('/home')" name="chat-o" size="20" :badge="totalUnreadMsgCounts | countFilter" />
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
    ...mapGetters(['totalUnreadMsgCounts', 'adressBooksMessages'])
  },
  watch: {
    adressBooksMessages(newVal, oldVal) {
      this.getMessagesCount(newVal)
    }
  },
  created() {
    this.getMessagesCount(this.adressBooksMessages)
  },
  methods: {
    activeColor(name) {
      const { path } = this.$route
      if (path === name) {
        return '#07c160'
      }
      return ''
    },
    getMessagesCount(newVal) {
      if (!newVal.length) {
        this.count = ''
        return
      }
      this.count = newVal.length > 100 ? '99+' : newVal.length
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .tab {
    display: flex;
    height: 52px;
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
        color: #666;
      }
      .tab-icon, .tab-link {
        display: block;
      }
      .tab-icon {
        height: 21px;
        margin-top: 9px;
      }
    }
    .router-link-active {
      .tab-link {
        color: #07c160;
      }
    }
  }
</style>
