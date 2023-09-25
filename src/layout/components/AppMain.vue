<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
import setting from '../../settings.js';
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return setting.cachedViews
    },
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - #{$navigationBarHeight});
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header+.app-main {
  padding-top: $navigationBarHeight;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - #{$navigationBarHeight} - 34px);
  }

  .fixed-header+.app-main {
    padding-top: calc(#{$navigationBarHeight} + 34px);
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
