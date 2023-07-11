<template>
  <div class="sidebar-logo-container" :title="title">
    <router-link class="sidebar-logo-link" to="/">
      <img src="../../../assets/logo.png" class="sidebar-logo" v-if="collapse">
      <img src="../../../assets/sidebar_logo.png" class="sidebar-logo" v-else>
    </router-link>
  </div>
</template>

<script>
import settings from '../../../settings.js'
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: settings.title,
      logo: '@/icons/logo.png'
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 135px;
  line-height: 135px;
  background: #fff;
  text-align: center;
  vertical-align: middle;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 80%;
      max-width: 167px;
      max-height: 52px;
      object-fit: contain;
      vertical-align: middle;
    }

  }

}
</style>
