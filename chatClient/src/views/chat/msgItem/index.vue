<script>
// import store from '@/store'
import { isEmpty } from '@/utils'
import { EMOJI_LIST } from '@/utils/face'
export default {
  name: 'TxtItem',
  props: {
    item: {
      type: Object,
      default: function() {
        return {}
      }
    },
    quesid: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      emojiList: EMOJI_LIST
    }
  },
  methods: {
    linkToEvaluation(quesid) {
      this.$router.push({
        path: '/questions/evaluation',
        query: {
          quesid: this.quesid
        }
      })
    }
  },
  render: function(h) {
    var _this = this
    // 撤回消息
    if (this.item.op_id === 'cancel') {
      return h(
        'span',
        [
          h('span', {
            domProps: {
              innerHTML: _this.item.txt
            },
            attrs: {
              class: 're-edit-txt'
            }
          }, this.$slots.default)
        ]
      )
    }
    // 满意度调查
    if (this.item.op_id === 966530) {
      return h(
        'span',
        [
          h('a', {
            domProps: {
              innerHTML: _this.item.txt
            },
            attrs: {
              class: 'txt-link',
              href: 'javascript:void(0)'
            },
            on: {
              click: () => {
                this.linkToEvaluation()
              }
            }
          }, this.$slots.default)
        ]
      )
    }
    // 图片
    if (!isEmpty(this.item.img) || (this.item.txt.indexOf('img') !== -1 && this.item.txt.indexOf('pimg') !== -1)) {
      const imgArr = this.item.img ? this.item.img.split(';') : []
      return h(
        'span', {
          attrs: {
            class: 'item-txt'
          }
        },
        [
          h('span', {
            domProps: {
              innerHTML: _this.item.txt
            },
            on: {
              click: function(event) {
                if (_this.item.txt.indexOf('img') !== -1 && _this.item.txt.indexOf('pimg') !== -1) {
                  const srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i // eslint-disable-line
                  const src = _this.item.txt.match(srcReg)[1]
                  _this.$emit('image-view-change', src)
                }
              }
            }
          }, this.$slots.default),

          imgArr.length > 1 ? h('span', {
            attrs: {
              class: 'images'
            }
          }, imgArr.map((item) => {
            return h('img', { // 多张图片
              attrs: {
                src: item
              },
              on: {
                click: function(event) {
                  _this.$emit('image-view-change', item)
                }
              }
            })
          })) : h('img', { // 只有一张图片
            attrs: {
              class: 'block',
              src: this.item.img
            },
            on: {
              click: function(event) {
                _this.$emit('image-view-change', _this.item.img)
              }
            }
          })
        ]
      )
    } else {
      let text = JSON.parse(JSON.stringify(this.item.txt))
      for (var i = 0; i < this.emojiList.length; i++) {
        text = text.replace(this.emojiList[i].reg, `<i class="iconf" id="icn_${this.emojiList[i].id}"></i>`)
      }
      this.item.txt = text
      return h('span', {
        domProps: {
          innerHTML: this.item.txt
        },
        attrs: {
          class: 'item-txt'
        }
      })
    }
  }
}
</script>
