
export const PopupMixin = {
  props: {

  },
  data: function data() {
    return {
      deviceWidth: '100%'
    }
  },
  created() {
    this.checkClinetModel()
  },
  mounted() {
    window.addEventListener('resize', () => {
      this.checkClinetModel()
    }, false)
  },
  methods: {
    checkClinetModel() {
      var u = navigator.userAgent
      var isAndroid = u.indexOf('Android') > -1
      var isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
      const chl = localStorage.getItem('chl') || ''
      this.deviceWidth = isAndroid || isIos || chl === '7' ? '100%' : '750px' // 理财终端自适应
      // console.log(this.deviceWidth)
    }
  }
}
