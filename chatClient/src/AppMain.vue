<template>
  <section class="app-main">
    <tab />
    <transition>
      <keep-alive>
        <router-view />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
import Tab from '@/components/Tab'
export default {
  name: 'AppMain',
  components: {
    Tab
  },
  computed: {
    // cachedViews() {
    //   return this.$store.state.tagsView.cachedViews
    // },
    // key() {
    //   return this.$route.fullPath
    // }
  }
}
</script>

<style scoped>
/* .app-main { */
  /*84 = navbar + tags-view = 50 +34 */
  /* min-height: calc(100vh);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding-top: 84px; */
/* } */
</style>
