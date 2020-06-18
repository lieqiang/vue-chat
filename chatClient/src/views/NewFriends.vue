<template>
  <div>
    <van-cell-group class="list">
      <van-cell center v-for="(item, index) in list" :key="index" to="/searchDetail">
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
            <div class="info">
              <span class="name">{{ item.nickname }}</span>
              <span class="desc">{{ item.signature }}</span>
            </div>
            <div class="status">
              <van-button v-if="item.sts === 0" type="primary" size="small">添加</van-button>
              <span v-if="item.sts === 1" class="added">已添加</span>
              <span v-if="item.sts === 2" class="added">已过期</span>
            </div>
          </div>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import Vue from 'vue'
import { CellGroup, Cell, Image as VanImage, Icon, Button } from 'vant'
Vue.use(CellGroup)
Vue.use(Cell)
Vue.use(VanImage)
Vue.use(Icon)
Vue.use(Button)
export default {
  data() {
    return {
      list: [
        {
          nickname: '邹烈强',
          src: 'https://img.yzcdn.cn/vant/cat.jpeg',
          signature: '这些都是测试数据，实际使用请严格按照该格式返回',
          sts: 1
        },
        {
          nickname: '徐峥',
          src: 'https://img.yzcdn.cn/vant/cat.jpeg',
          signature: '代码在囧途，也要写到底',
          sts: 2
        },
        {
          nickname: '邹烈强',
          src: 'https://img.yzcdn.cn/vant/cat.jpeg',
          signature: '这些都是测试数据，实际使用请严格按照该格式返回',
          sts: 2
        },
        {
          nickname: '马云',
          src: 'https://img.yzcdn.cn/vant/cat.jpeg',
          signature: '让天下没有难写的代码',
          sts: 1
        },
        {
          nickname: '刘涛',
          src: 'https://img.yzcdn.cn/vant/cat.jpeg',
          signature: '如约而至，不负姊妹欢乐颂',
          sts: 0
        }
      ]
    }
  },
  computed: {
  },
  watch: {
  },
  created() {
  },
  methods: {}
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  // scss用变量的形式改造 参考点证
  .van-cell__title {
    flex: 0 0 50px;
  }
  .right {
    display: flex;
    flex: 1;
    align-items: center;
    padding: 5px 0 5px 16px;
    overflow: hidden;
    .name {
      font-size: 14px;
      color: #333;
    }
    .desc {
      font-size: 12px;
      color: #666;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .info {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
  }
  .status {
    flex: 0 0 60px;
    padding-left: 10px;
    color: #666;
  }
</style>
