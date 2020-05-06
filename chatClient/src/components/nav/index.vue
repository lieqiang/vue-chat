<!--
 * @Description: web chat
 * @Author: Lieqiang Zou
 * @Date: 2019-09-16 09:55:27
 * @LastEditTime: 2019-10-08 09:43:46
 -->
<template>
  <div class="h-50">
    <div class="chat-container-header nav">
      <span class="nav-back pointer" @click.stop="back">
        <svg-icon icon-class="back" class="back-icon v-m" />
      </span>
      <span :style="{lineHeight: hasSlot ? '17px' : '50px'}" class="nav-tit">
        <span v-if="!hasSlot" class="name">{{ navName }}</span>
        <slot/>
      </span>
      <span v-if="name" class="nav-right" @click.stop="more">{{ name }}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    hasSlot: {
      type: Boolean,
      default: false
    },
    path: {
      type: String,
      default: ''
    },
    navName: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    more() {
      this.$router.push({
        path: this.path
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.h-50 {
  height: 50px;
}
.nav {
  position: relative;
  background-color: rgba(245,245,245,.7);
  color: #444;
  padding: 0 15px 0 10px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  z-index: 999;
  .nav-back {
    .back-icon {
      margin-top: -4px;
      font-size: 23px;
      color: #fff;
    }
  }
  .nav-right {
    font-size: 14px;
    color: #fff;
    cursor: pointer;
  }
  .nav-back, .nav-right {
    position: absolute;
    bottom: 0;
  }
  .nav-back {
    left: 7px;
  }
  .nav-right {
    right: 16px;
  }
  .nav-tit {
    display: block;
    height: 50px;
    max-width: 60%;
    margin: 0 auto;
    text-align: center;
    font-size: 16px;
    .question-tit {
      display: block;
      padding-top: 7px;
      font-size: 16px;
      .question-id {
        font-size: 14px;
      }
    }
    .question-sts {
      display: block;
      font-size: 12px;
    }
  }
  .v-m {
    vertical-align: middle;
  }
}
// @media screen and (min-width: 1024px) {
//   .nav {
//     width: 100%;
//     max-width: 1024px;
//     margin: 0 auto;
//   }
// }
</style>
