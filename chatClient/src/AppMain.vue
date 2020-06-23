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
  }
}
</script>
