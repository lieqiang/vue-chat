<template>
  <div>
    <van-nav-bar fixed left-arrow>
      <template #right>
        <van-icon name="ellipsis" size="18" />
      </template>
    </van-nav-bar>
    <van-cell-group class="list">
      <van-cell center v-for="(item, index) in data" :key="index" class="avatar">
        <template #title>
          <van-image
            round
            width="50"
            height="50"
            :src="item.src"
          />
        </template>
        <template #right-icon>
          <div class="right">
            <span class="name">{{ item.name }}</span>
            <span class="desc">地区：{{ item.city }}</span>
          </div>
        </template>
      </van-cell>
      <van-cell center v-for="(item, index) in data" title="个性签名" :value="item.signature" :key="index" class="mt-5" value-class="center" />
      <van-cell center v-for="(item, index) in data" title="来源" value="搜索" :key="index" value-class="center" />
    </van-cell-group>
    <div class="add pt-5">
      <van-button block type="default">添加到通讯录</van-button>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { NavBar, Icon, Button, Cell, CellGroup, Image as VanImage } from 'vant'
// import { search } from '@/api/user'
Vue.use(NavBar).use(Icon).use(Button).use(Cell).use(CellGroup).use(VanImage)

export default {
  name: 'Search',
  components: {
  },
  data() {
    return {
      data: [
        {
          name: '邹烈强',
          city: '深圳',
          src: 'https://img.yzcdn.cn/vant/cat.jpeg',
          signature: '这些都是测试数据，实际使用请严格按照该格式返回'
        }
      ]
    }
  },
  methods: {

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
