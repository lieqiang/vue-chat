<!--
 * @Description: web chat
 * @Author: Lieqiang Zou
 * @Date: 2019-09-16 09:55:27
 * @LastEditTime: 2019-09-20 20:34:09
 -->
<template>
  <van-swipe id="swipe" ref="swipe" indicator-color="#666" @change="onChange">
    <van-swipe-item v-for="(item, index) in faceList" :key="index">
      <div class="item-txt mousewheel">
        <span v-for="(cell, index) in item" :key="index" class="item mousewheel" @click.stop="faceChange(cell)">
          <span :id="'icn_' + cell.id" class="iconf mousewheel"/>
        </span>
        <span class="item mousewheel">
          <span class="iconf delete" @click.stop="deleteText"/>
        </span>
      </div>
    </van-swipe-item>
  </van-swipe>
</template>
<script>
import Vue from 'vue'
import { Swipe, SwipeItem, Icon } from 'vant'
import { EMOJI_LIST } from '@/utils/face'
import { judgeDeviceType } from '@/utils'
Vue.use(Swipe).use(SwipeItem).use(Icon)
let currentTime = 0
let lastTime = 0
let triggerFlag = 5
export default {
  data() {
    return {
      face: EMOJI_LIST,
      faceList: [],
      currentIndex: 0
    }
  },
  created() {
    this.getFaceList()
  },
  mounted() {
    const isMobile = judgeDeviceType.isIOS || judgeDeviceType.isAndroid
    if (!isMobile) {
      if (document.addEventListener) {
        document.addEventListener('DOMMouseScroll', this.scrollFunc, false)
      }
      window.onmousewheel = document.onmousewheel = this.scrollFunc
    }
  },
  methods: {
    scrollFunc(event) {
      if (event.target.className.indexOf('mousewheel') !== -1) {
        const e = event || window.event
        lastTime = currentTime
        currentTime = new Date().getTime()
        const delta = (e.wheelDelta && (e.wheelDelta > 0 ? 1 : -1)) || (e.detail && (e.detail > 0 ? -1 : 1))
        if (currentTime - lastTime <= 200) {
          if (delta < 0 && delta !== triggerFlag) {
            this.swipeTo('down')
            triggerFlag = delta
          } else if (delta > 0 && delta !== triggerFlag) {
            this.swipeTo('up')
            triggerFlag = delta
          }
        } else {
          if (delta < 0) {
            this.swipeTo('down')
            triggerFlag = delta
          } else {
            this.swipeTo('up')
            triggerFlag = delta
          }
        }
      }
    },
    swipeTo(d) {
      let idx
      if (d === 'up') {
        idx = this.currentIndex - 1
        if (idx < 0) {
          this.currentIndex = 4
          idx = 4
        }
      }
      if (d === 'down') {
        idx = this.currentIndex + 1
        if (idx > 4) {
          this.currentIndex = 0
          idx = 0
        }
      }
      this.$refs.swipe.swipeTo(idx)
    },
    getFaceList() {
      const faceList = []
      const face1 = []
      const face2 = []
      const face3 = []
      const face4 = []
      const face5 = []
      this.face.forEach((item, index) => {
        if (index < 20) {
          face1.push(item)
        } else if (index >= 20 && index < 40) {
          face2.push(item)
        } else if (index >= 40 && index < 60) {
          face3.push(item)
        } else if (index >= 60 && index < 80) {
          face4.push(item)
        } else if (index >= 80 && index < 100) {
          face5.push(item)
        }
      })
      faceList.push(face1, face2, face3, face4, face5)
      this.faceList = faceList
    },
    faceChange(tl) {
      this.$emit('face-change', tl)
    },
    deleteText() {
      this.$emit('delete-text')
    },
    onChange(index) {
      this.currentIndex = index
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import '../../styles/face.scss';
.van-swipe__indicator {
  background-color: #666;
}
.item-txt {
  .iconf {
    width: 30px;
    height: 30px;
    display: inline-block;
  }
}
.item-txt {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 15px 0 23px 0;
}
.item {
  text-align: center;
  padding: 10px 0;
  width: 14%;
  &:active {
    background-color: #f2f2f2;
  }
}
.close {
  text-align: left;
  padding-left: 3px;
  vertical-align: bottom;
}
.delete {
  width: 23px !important;
  height: 23px !important;
  background: url(../../assets/delete.png) no-repeat;
}
</style>
