<template>
  <div>
    <van-nav-bar fixed left-arrow @click-left="$router.go(-1)">
      <template #right>
        <van-icon name="ellipsis" size="18" />
      </template>
    </van-nav-bar>
    <van-cell-group class="list">
      <van-cell center class="avatar">
        <template #title>
          <van-image
            round
            width="50"
            height="50"
            :src="friendInfo.src"
          />
        </template>
        <template #right-icon>
          <div class="right">
            <span class="name">{{ friendInfo.nickname || friendInfo.name }}</span>
            <span class="desc">地区：{{ friendInfo.province.name }}-{{ friendInfo.city.name }}-{{ friendInfo.town.name }}</span>
          </div>
        </template>
      </van-cell>
      <van-cell title="个性签名" :value="friendInfo.signature" class="mt-5" value-class="center" />
      <van-cell title="来源" value="搜索" value-class="center" />
    </van-cell-group>
    <div class="add pt-5">
      <van-button block type="default" @click="addToAddressBooks">添加到通讯录</van-button>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { NavBar, Icon, Button, Cell, CellGroup, Image as VanImage, Toast } from 'vant'
Vue.use(NavBar).use(Icon).use(Button).use(Cell).use(CellGroup).use(VanImage).use(Toast)

export default {
  name: 'SearchDetail',
  data() {
    return {
      friendInfo: {
        _id: '',
        name: '',
        nickname: '',
        province: '',
        city: '',
        town: '',
        src: '',
        signature: ''
      }
    }
  },
  created() {
    this.friendInfo = this.$route.query
  },
  methods: {
    addToAddressBooks() {
      this.$router.push({
        path: '/sendValidate',
        query: this.friendInfo
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .mt-5 {
    margin-top: 5px;
  }
  .pt-5 {
    padding-top: 5px;
  }
  .list {
    padding-top: 46px;
  }
  .add {
    background-color: #f2f2f2;
  }
  .van-cell-group {
    background-color: #f2f2f2;
    .van-cell {
      background-color: #fff;
    }
  }

  .avatar {
    .van-cell__title {
      flex: 0 0 50px;
    }
  }
  .right {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 5px 0 5px 16px;
    overflow: hidden;
    .name {
      font-size: 16px;
      color: #333;
    }
    .desc {
      font-size: 12px;
      color: #666;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .center {
      text-align: center;
    }
  }
  .bg {
    height: 5px;
    background-color: #f2f2f2;
  }
</style>
