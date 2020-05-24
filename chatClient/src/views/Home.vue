<template>
  <div>
    <van-nav-bar fixed left-text="聊天(10)">
      <template #right>
        <van-icon name="search" size="18" @click="search" />
        <van-icon name="add-o" size="18" class="ml-20" @click="isAddShow = true" />
      </template>
    </van-nav-bar>
    <van-cell-group class="list">
      <van-cell center v-for="(item, index) in conversationsList" :key="index" to="/chat">
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
            <span class="name">{{ item.nickName }}</span>
            <span class="desc">{{ item.desc }}</span>
          </div>
        </template>
      </van-cell>
    </van-cell-group>
    <div v-show="isShow" class="fixed">
      <search
        @cancel="cancel"
      />
    </div>
    <div v-show="isAddShow" class="fixed">
      <add
        @cancel="isAddShow = false"
      />
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { NavBar, Icon, Cell, CellGroup, Toast, Image as VanImage } from 'vant'
import Search from '@/components/Search'
import Add from '@/components/Add'
Vue.use(NavBar).use(Icon).use(Cell).use(CellGroup).use(Toast).use(VanImage)
export default {
  name: 'Home',
  components: {
    Search,
    Add
  },
  data() {
    return {
      isShow: false,
      isAddShow: false,
      conversationsList: [
        {
          nickName: '邹烈强',
          src: 'https://img.yzcdn.cn/vant/cat.jpeg',
          desc: '这些都是测试数据，实际使用请严格按照该格式返回'
        },
        {
          nickName: '徐峥',
          src: 'https://img.yzcdn.cn/vant/cat.jpeg',
          desc: '代码在囧途，也要写到底'
        },
        {
          nickName: '邹烈强',
          src: 'https://img.yzcdn.cn/vant/cat.jpeg',
          desc: '这些都是测试数据，实际使用请严格按照该格式返回'
        },
        {
          nickName: '马云',
          src: 'https://img.yzcdn.cn/vant/cat.jpeg',
          desc: '让天下没有难写的代码'
        },
        {
          nickName: '刘涛',
          src: 'https://img.yzcdn.cn/vant/cat.jpeg',
          desc: '如约而至，不负姊妹欢乐颂'
        },
        {
          nickName: '邹烈强',
          src: 'https://img.yzcdn.cn/vant/cat.jpeg',
          desc: '这些都是测试数据，实际使用请严格按照该格式返回'
        },
        {
          nickName: '马云',
          src: 'https://img.yzcdn.cn/vant/cat.jpeg',
          desc: '让天下没有难写的代码'
        },
        {
          nickName: '刘涛',
          src: 'https://img.yzcdn.cn/vant/cat.jpeg',
          desc: '如约而至，不负姊妹欢乐颂'
        }
      ]
    }
  },
  methods: {
    search() {
      this.isShow = true
    },
    cancel() {
      this.isShow = false
    },
    add() {

    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .ml-20 {
    margin-left: 20px;
  }
  .list {
    padding-top: 46px;
  }
  .van-cell {
    &:hover, &:active {
      background-color: #F2F2F2;
    }
  }
  .van-cell__title {
    flex: 0 0 50px;
  }
  .right {
    display: flex;
    flex-direction: column;
    flex: 1;
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
  .fixed {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 999;
    background-color: #f2f2f2;
  }
</style>
