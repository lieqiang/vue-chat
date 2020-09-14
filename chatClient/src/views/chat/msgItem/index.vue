<script>
import { mapGetters } from 'vuex'
import { EMOJI_LIST } from '@/utils/face'
export default {
  name: 'TxtItem',
  props: {
    item: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      emojiList: EMOJI_LIST
    }
  },
  computed: {
    ...mapGetters(['root'])
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
    if (this.item.msgType === 'img') {
      const imgSrc = `${this.root}${this.item.message}`
      return h(
        'span', {
          attrs: {
            class: 'item-txt'
          }
        },
        [
          h('img', {
            attrs: {
              class: 'block',
              src: imgSrc
            },
            on: {
              click: function(event) {
                _this.$emit('image-view-change', imgSrc)
              }
            }
          })
        ]
      )
    }
    let text = JSON.parse(JSON.stringify(this.item.message))
    for (var i = 0; i < this.emojiList.length; i++) {
      text = text.replace(this.emojiList[i].reg, `<i class="iconf" id="icn_${this.emojiList[i].id}"></i>`)
    }
    this.item.message = text
    return h('span', {
      domProps: {
        innerHTML: this.item.message
      },
      attrs: {
        class: 'item-txt'
      }
    })
  }
}
</script>
