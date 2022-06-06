<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <breadcrumb
        :key="key2"
        id="breadcrumb-container"
        class="breadcrumb-container"
      />
    </transition>
    <transition name="fade-transform" mode="out-in">
      <router-view class="router-view" :key="key" />
    </transition>
  </section>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    },
    key2() {
      return this.$route.name
    },
  },
  components: {
    Breadcrumb,
  },
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';
.app-main {
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: #f6f6f6;
  display: flex;
  flex-direction: column;
}

.fixed-header + .app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
