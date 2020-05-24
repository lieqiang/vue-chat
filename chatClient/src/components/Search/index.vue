<template>
  <div class="search">
    <div class="search-input">
      <van-field
        v-model="inputText"
        left-icon="search"
        placeholder="搜索"
      />
    </div>
    <div class="cancel-button">
      <van-button type="default" size="small" @click="cancel">取消</van-button>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { Field, Button } from 'vant'
import { search } from '@/api/user'
Vue.use(Field).use(Button)

export default {
  name: 'Search',
  components: {
  },
  data() {
    return {
      inputText: ''
    }
  },
  watch: {
    inputText(newVal, oldVal) {
      setTimeout(() => {
        this.search()
      }, 500)
    }
  },
  methods: {
    async search() {
      const res = await search({ txt: this.inputText })
      console.log(res)
    },
    cancel() {
      this.$emit('cancel')
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .search {
    display: flex;
    align-items: center;
    .search-input {
      flex: 1;
    }
    // .cancel-button {
    // }
  }
</style>
