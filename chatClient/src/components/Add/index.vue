<template>
  <div>
    <van-search
      v-model="inputText"
      show-action
      placeholder="搜索"
      @search="search"
      @cancel="cancel"
    />
    <div class="search-result">
      <van-cell-group>
        <van-cell
        v-for="(item, index) in result"
        clickable
        :key="index"
        :title="item.name"
        :label="item.signature"
        @click="linkToSearchDetail(item)"
      />
      </van-cell-group>
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
  components: {
  },
  data() {
    return {
      inputText: '',
      description: '输入关键字搜索',
      result: []
    }
  },
  watch: {
    inputText(newVal, oldVal) {
      if (newVal) {
        setTimeout(() => {
          this.search()
        }, 500)
      } else {
        this.result = []
        this.description = '输入关键字搜索'
      }
    }
  },
  methods: {
    async search() {
      const res = await search({ txt: this.inputText })
      if (res.data.error_code !== 0) {
        this.result = []
        this.description = '暂无搜索结果'
        return
      }
      this.result = res.data.data
      this.description = !res.data.data.length ? '暂无搜索结果' : ''
      console.log(res)
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
</style>
