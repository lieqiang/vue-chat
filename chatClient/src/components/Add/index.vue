<template>
  <div>
    <van-search
      background="#f2f2f2"
      v-model="inputText"
      :show-action="isShowAction"
      placeholder="搜索"
      @input="inputChange"
      @search="search"
      @cancel="cancel"
    />
    <div class="search-result">
      <van-cell
      v-for="(item, index) in result"
      clickable
      :key="index"
      :title="item.nickname || item.name"
      :label="item.signature"
      @click="linkToSearchDetail(item)"
    />
    </div>
    <van-empty
      v-show="!result.length"
      image="search"
      :description="description"
    />
  </div>
</template>
<script>
import Vue from 'vue'
import { Search, Button, Cell, CellGroup, Empty } from 'vant'
import { search } from '@/api/user'
Vue.use(Search).use(Button).use(Cell).use(CellGroup).use(Empty)

export default {
  name: 'Search',
  props: {
    isShowAction: {
      type: Boolean,
      default: true
    }
  },
  components: {
  },
  data() {
    return {
      inputText: '',
      description: '输入关键字搜索',
      result: []
    }
  },
  methods: {
    inputChange() {
      if (this.inputText) {
        this.search()
      } else {
        this.result = []
        this.description = '输入关键字搜索'
      }
    },
    async search() {
      if (this.inputText) {
        const res = await search({ txt: this.inputText })
        if (res.data.error_code !== 0) {
          this.result = []
          this.description = '暂无搜索结果'
          return
        }
        this.result = res.data.data
        this.description = !res.data.data.length ? '暂无搜索结果' : ''
      }
    },
    cancel() {
      this.$emit('cancel')
    },
    linkToSearchDetail(item) {
      this.$router.push({
        path: '/searchDetail',
        query: item
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .van-search__content {
    background-color: #fff;
  }
</style>
