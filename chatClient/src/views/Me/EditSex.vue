<template>
  <div>
    <van-nav-bar
      left-arrow
      fixed
      left-text="设置性别"
      @click-left="back"
    >
      <template #right>
        <van-button type="primary" size="small" @click="save">保存</van-button>
      </template>
    </van-nav-bar>
    <div class="wrapper">
      <van-radio-group v-model="sex">
        <van-cell-group>
          <van-cell title="男" clickable @click="sex = '0'">
            <template #right-icon>
              <van-radio name="0" checked-color="#07c160" />
            </template>
          </van-cell>
          <van-cell title="女" clickable @click="sex = '1'">
            <template #right-icon>
              <van-radio name="1" checked-color="#07c160" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { NavBar, RadioGroup, Radio, CellGroup, Cell, Button, Toast } from 'vant'
import { updateUserInfo } from '@/api/user'
Vue.use(NavBar).use(RadioGroup).use(Radio).use(CellGroup).use(Cell).use(Button).use(Toast)
export default {
  name: 'EditSex',
  data() {
    return {
      sex: '1'
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created() {
    this.sex = this.userInfo.sex
  },
  methods: {
    back() {
      window.history.go(-1)
    },
    async save(e) {
      const params = {
        name: this.userInfo.name,
        field: {
          sex: this.sex
        }
      }
      const response = await updateUserInfo(params)
      if (!response.error_code === 0) {
        return Toast('设置性别失败-_-')
      }
      this.$store.dispatch('updateUserInfo', { sex: this.sex })
      this.$router.push({
        path: '/PersonalInfo'
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .wrapper {
    position: fixed;
    top: 46px;
    bottom: 44px;
    left: 0;
    right: 0;
  }
</style>
