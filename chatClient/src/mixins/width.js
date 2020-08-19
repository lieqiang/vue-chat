
export const PopupMixin = {
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
      this.deviceWidth = isAndroid || isIos ? '100%' : '750px'
    }
  }
}
