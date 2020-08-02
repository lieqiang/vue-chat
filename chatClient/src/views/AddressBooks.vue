<template>
  <div class="list">
    <van-index-bar :index-list="indexList">
      <van-index-anchor index="#" />
      <van-cell center to="/newFriends">
        <template #title>
          <van-icon name="chat-o" color="#1989fa" size="40" :badge="count" />
        </template>
        <template #right-icon>
          <div class="right">
            <span class="name">新的朋友</span>
          </div>
        </template>
      </van-cell>
      <template v-for="(item, index) in addressBooks">
        <van-index-anchor :key="index" :index="item.title" />
        <van-cell center v-for="(cell, idx) in item.items" :key="idx" to="/chat">
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
              <span class="name">{{ cell.nickname || cell.name }}</span>
            </div>
          </template>
        </van-cell>
      </template>
    </van-index-bar>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { IndexBar, IndexAnchor, Cell, Image as VanImage, Icon } from 'vant'

Vue.use(IndexBar)
Vue.use(IndexAnchor)
Vue.use(Cell)
Vue.use(VanImage)
Vue.use(Icon)
export default {
  data() {
    return {
      count: '',
      addressBooks: [],
      indexList: []
    }
  },
  computed: {
    ...mapGetters(['conversationsList', 'adressBooksMessages'])
  },
  watch: {
    conversationsList(newVal, oldVal) {
      console.log('newVal', newVal)
      this.addressBooks = this._normalizeList(newVal)
    },
    adressBooksMessages(newVal, oldVal) {
      this.getMessagesCount(newVal)
    }
  },
  created() {
    console.log('enter')
    this.getMessagesCount(this.adressBooksMessages)
    this.addressBooks = this._normalizeList(this.conversationsList)
  },
  methods: {
    getMessagesCount(newVal) {
      if (!newVal.length) {
        this.count = ''
        return
      }
      this.count = newVal.length > 100 ? '99+' : newVal.length
    },
    _normalizeList(list) {
      const map = {}
      const indexList = []
      list.forEach((item, index) => {
        const key = item.name.substring(0, 1).toUpperCase()
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
          indexList.push(key)
        }
        map[key].items.push({
          name: item.name,
          nickname: item.nickname,
          id: item.id
        })
      })
      // 为了得到有序列表，我们需要处理 map
      const ret = []
      for (const key in map) {
        const val = map[key]
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      indexList.sort((a, b) => {
        return a.charCodeAt(0) - b.charCodeAt(0)
      })
      console.log(ret)
      const newFriendIndex = ['#']
      this.indexList = newFriendIndex.concat(indexList)
      return ret
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .list {
    padding-bottom: 44px;
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
</style>
