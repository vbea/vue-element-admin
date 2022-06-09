<template>
  <div class="navbar">
    <div class="hamburger" @click="toggleSideBar">
      <img src="@/assets/nav/hamburger.png" />
    </div>
    <div class="right-menu">
      <template v-if="device !== 'mobile'">
        <el-dropdown @command="handleCommand">
          <div class="right-menu-user">
            <span class="line"></span>
            <span class="name">{{ name }}</span>
            <img class="avatar" src="@/assets/nav/avatar.png" />
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="logout">Log Out</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      recongnizeQRCodeDialogVisible: false,
    }
  },
  components: {
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar', 'device', 'name'])
  },
  methods: {
    recongnizeQRCodeSuccess(jsonString) {
      try {
        const content = JSON.parse(jsonString)
        if (content.requestId) {
          this.$router.push({
            name: 'requestManagementDetail',
            query: { id: content.requestId },
          })
        }
        if (content.productId) {
          this.$router.push({
            name: 'productManagementAddProduct',
            query: { productId: content.productId },
          })
        }
      } catch (error) {
        this.$notify.error(
          'Please use Product Tag QRCode or Request Tag QRCode'
        )
      }
    },
    onClickScanQrcodeButton() {
      this.recongnizeQRCodeDialogVisible = true
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    logout() {
      this.$confirm('Are you sure you want to logout ?', 'Logout', {
        confirmButtonText: 'Ok',
        cancelButtonText: 'Cancel',
        type: 'warning',
      }).then(async () => {
        await this.$store.dispatch('user/logout')
        this.$router.push(`/login`)
      })
    },
    handleCommand(fn) {
      this[fn]()
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';
.navbar {
  display: flex;
  height: 50px;
  overflow-y: hidden;
  position: relative;
  align-items: center;
  flex-wrap: wrap;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .hamburger {
    padding: 0px 15px;
    cursor: pointer;
    > img {
      display: inline-block;
      vertical-align: middle;
      width: 24px;
      height: 24px;
    }
  }
  .breadcrumb-container {
    white-space: nowrap;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    flex: 1;
    display: flex;
    height: 100%;
    align-items: center;
    flex-direction: row;
    position: relative;
    justify-content: flex-end;
    .qr-scan {
      margin-right: 20px;
    }

    .right-menu-image {
      cursor: pointer;
      padding: 8px 30px;
      border-left: 1px solid #eee;
      img {
        width: 22px;
        height: 22px;
      }
    }
    &-user {
      display: flex;
      align-items: center;
      .line {
        border-left: 1px solid #dfe0eb;
        height: 35px;
      }
      .name {
        margin-left: 14px;
        margin-right: 16px;
        font-size: 14px;
        color: #333;
        text-transform: capitalize;
      }
      .avatar {
        height: 40px;
        width: 40px;
        border-radius: 50%;
        margin-right: 32px;
      }
    }
  }
}
</style>
