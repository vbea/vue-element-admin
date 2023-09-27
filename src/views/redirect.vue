<template>
  <div></div>
</template>

<script>
import store from '@/store'
import permission from '@/utils/permission.js'
import { getAuthRoutesLocale } from '@/utils/auth.js'
export default {
  data() {
    return {
      
    }
  },
  created() {
    this.checkPermission()
  },
  methods: {
    checkPermission() {
      let path = '/dashboard'
      const routes = getAuthRoutesLocale();
      if (routes.length > 0) {
        let validPath = false;
        for (let _route of routes) {
          if (path.indexOf(_route[permission.RESOURCE_KEY]) >= 0) {
            validPath = true;
            break
          }
        }
        if (!validPath) {
          path =  routes[0][permission.RESOURCE_KEY];
        }
      }
      this.$router.push({
        path: path
      })
    }
  }
}
</script>

<style>
</style>