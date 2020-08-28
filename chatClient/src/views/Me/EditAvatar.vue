<template>
  <div>
    <van-nav-bar
      left-arrow
      fixed
      left-text="头像"
      @click-left="$router.go(-1)"
      @click-right="onClickRight"
    >
      <template #right>
        <van-icon name="ellipsis" size="18" />
      </template>
    </van-nav-bar>
    <div class="main-content">
      <van-image-preview v-model="imageShow" :asyncClose="true" :images="images" />
    </div>
    <van-action-sheet cancel-text="取消" v-model="showActionSheet" :actions="actions" @select="onSelect" />
    <input
      id="uploadPic"
      ref="uploadPic"
      type="file"
      style="display:none"
      accept="image/*"
      @change="handleChange($event)"
    >
    <div v-if="loading" class="img-loading">
      <van-loading color="#1989fa" />
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { NavBar, ImagePreview, ActionSheet, Toast, Loading } from 'vant'
import { updateUserInfo } from '@/api/user'
import { uploadImg } from '@/api/upload'
Vue.use(NavBar).use(ImagePreview).use(ActionSheet).use(Toast).use(Loading)
export default {
  name: 'EditAvatar',
  data() {
    return {
      index: 0,
      loading: false,
      imageShow: true,
      showActionSheet: false,
      images: [],
      actions: [{
        id: 0,
        name: '从手机相册选择',
        method: 'upload'
      }, {
        id: 1,
        name: '保存到手机',
        method: 'save'
      }]
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'root'])
  },
  created() {
    this.images.push(this.userInfo.avatar)
  },
  methods: {
    onClickRight() {
      this.showActionSheet = true
    },
    onSelect(item) {
      this[item.method]()
    },
    upload() {
      this.$refs.uploadPic.click()
    },
    async handleChange(e) {
      if (!e.target.files.length) {
        return
      }
      var files = e.target.files
      const maxSize = 5 * 1024 * 1024
      if (files[0].size > maxSize) {
        Toast('图片大小不能超过5M')
        this.$refs.uploadPic.value = ''
        return
      }
      this.loading = true
      const formData = new FormData()
      formData.append('file', files[0])
      const res = await uploadImg(formData)
      this.loading = false
      if (!res.error_code === 0) {
        this.$refs.uploadPic.value = ''
        return Toast('上传头像失败-_-')
      }
      this.$refs.uploadPic.value = ''
      const params = {
        name: this.userInfo.name,
        field: {
          avatar: res.data.data
        }
      }
      const response = await updateUserInfo(params)
      if (!response.error_code === 0) {
        return Toast('保存头像失败-_-')
      }
      this.$store.dispatch('updateUserInfo', { avatar: `${this.root}${res.data.data}` })
      this.$router.push({
        path: '/PersonalInfo'
      })
    },
    save() {
      console.log('save')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .img-loading {
    position: fixed;
    z-index: 9999;
    top: 50%;
    margin-top: -15px;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
