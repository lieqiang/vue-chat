<template>
  <div class="tab">
    <router-link tag="div" class="tab-item" to="/home">
      <span class="tab-link">聊天</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/addressBooks">
      <span class="tab-link">通讯录</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/me">
      <span class="tab-link">我</span>
    </router-link>
  </div>
</template>

<script>
export default {}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .tab {
    display: flex;
    height: 44px;
    line-height: 44px;
    font-size: 14px;
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
    }
    .router-link-active {
      .tab-link {
        color: #07c160;
      }
    }
  }
</style>
