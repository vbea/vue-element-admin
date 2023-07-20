<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar" />

    <breadcrumb
      id="breadcrumb-container"
      class="breadcrumb-container" />

    <div
      class="right-menu"
      v-show="device !== 'mobile'">
      <el-dropdown
        @command="(v) => handleCommand(v)"
        trigger="hover">
        <div class="right-menu-item">
          <i class="el-icon-user-solid account"></i>
          <span class="trademarker" v-if="username">
            Hi, {{username}}
          </span>
        </div>
        <el-dropdown-menu
          slot="dropdown"
          class="account-dropdown">
          <div class="account-dropdown-item">
            <avatar
              :size="45"
              :lighten="100"
              :username="username"
              color="rgba(255,255,255,.9)"
              v-if="colorfulAvatar"/>
            <img
              class="avatar"
              src="../../assets/nav/avatar.png"
              v-else/>
            <div class="flexl">
              <div class="flexc">
                <span class="username">{{username}}</span>
                <span class="role" v-if="role">{{role}}</span>
              </div>
              <span class="email"><{{email}}></span>
            </div>
          </div>
          <el-dropdown-item
            divided
            command="logout"
            style="padding: 5px 20px;">
            <span>Log out</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- <div
        class="right-menu-image"
        @click="onClickNotificationButton">
        <i class="el-icon-message"></i>
      </div> -->
      <div
        class="right-menu-image"
        @click="onClickMessageButton">
        <i class="el-icon-message-solid"></i>
      </div>
      <div
        class="right-menu-image"
        @click="logout">
        <i class="el-icon-switch-button bold"></i>
      </div>
    </div>
    <div
      class="right-menu"
      v-show="device == 'mobile'">
      <el-dropdown
        class="avatar-container"
        @command="(v) => handleCommand(v)"
        trigger="click">
        <div class="avatar-wrapper">
          <!-- <i class="el-icon-menu"/> -->
          <avatar
            :size="42"
            :lighten="100"
            :username="username"
            color="rgba(255,255,255,.9)"
            v-if="colorfulAvatar"/>
          <img
            class="avatar"
            src="../../assets/nav/avatar.png"
            v-else/>
        </div>
        <el-dropdown-menu
          slot="dropdown"
          class="user-dropdown">
          <el-dropdown-item command="">
            <span class="fixed-username">Hi, {{username}}</span>
          </el-dropdown-item>
          <el-dropdown-item divided command="onClickMessageButton">
            <span>Message</span>
          </el-dropdown-item>
          <!--el-dropdown-item divided command="onClickNotificationButton">
            <span>Email</span>
          </el-dropdown-item-->
          <el-dropdown-item divided command="logout">
            <span>Log out</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import Avatar from 'vue-avatar'
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import {getUserName, getEmail, getRoleName} from '../../utils/auth.js'

export default {
  components: {
    Avatar,
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device'
    ])
  },
  data() {
    return {
      username: 'Admin',
      email: '',
      role: '',
      colorfulAvatar: true
    }
  },
  created() {
    this.username = getUserName()
    this.email = getEmail()
    this.role = getRoleName()
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    logout() {
      this.$confirm('Are you sure you want to log out?', 'Log out', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      }).then(async () => {
        const path = this.$router.currentRoute.fullPath
        //console.log('lougout+path', path);
        this.$store.dispatch("user/logout").then(res => {
          this.$store.commit('permission/SET_ROUTES', []);
          this.$router.push({ path: "/login?redirect=" + path});
        })
      }).catch(err => {
        
      })
    },
    onClickMessageButton() {
      this.$router.push({
        path: "/notification-management/in-app-notification"
      })
    },
    /*onClickNotificationButton() {
      console.log(' click notification button .............')
    },*/
    handleCommand(v) {
      if (v) this[v]()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';
.navbar {
  display: flex;
  height: $navigationBarHeight;
  overflow-y: hidden;
  position: relative;
  align-items: center;
  flex-wrap: wrap;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: calc(#{$navigationBarHeight} - 3px);
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    white-space: nowrap;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  
  .avatar-container {
    margin-left: 10px;
    .el-icon-menu {
      color: #555;
      font-size: 22px;
    }
  }

  .right-menu {
    flex: 1;
    display: flex;
    height: 100%;
    align-items: center;
    flex-direction: row;
    position: relative;
    justify-content: flex-end;
    .trademarker {
      padding-left: 5px;
      font-family: sans-serif;
      font-style: normal;
      font-weight: normal;
      font-size: 15px;
      text-transform: capitalize;
      color: #333333;
    }
    .sparator {
      width: 1px;
      height: 35px;
      background: #EEEEEE;
    }

    .account {
      /*background-color: #001489;*/
      padding: 9px;
      border-radius: 6px;
    }

    .right-menu-item {
      display: flex;
      color: #333;
      font-size: 24px;
      padding: 0 30px;
      align-items: center;
      justify-content: center;
    }
    
    .right-menu-image {
      cursor: pointer;
      color: #888;
      font-size: 24px;
      padding: 8px 20px;
      transition: all .4s;
      border-left: 1px solid #eee;
      .bold {
        font-weight: bold;
      }
      &:hover {
        color: #333;
      }
    }
  }
}
</style>
<style>
  .fixed-header {
    padding-right: 15px;
    background-color: white;
  }
  .fixed-username {
    color: #333;
    font-size: 14px;
    user-select: none;
    padding-right: 10px;
    text-transform: capitalize;
  }
  .user-dropdown {
    padding: 5px 0px !important;
  }
  .account-dropdown {
    padding: 0 !important;
    min-width: 200px;
  }
  .account-dropdown-item {
    display: flex;
    font-size: 24px;
    align-items: center;
    padding: 10px 20px;
    margin-right: 20px;
    font-family: sans-serif;
    font-style: normal;
    font-weight: normal;
  }
  .avatar {
    width: 45px;
    height: 45px;
  }
  .avatar-wrapper .avatar {
    width: 42px;
    height: 42px;
  }
  .username {
    padding-left: 10px;
    font-size: 16px;
    text-transform: capitalize;
    color: #333333;
    transform: scale(.9);
  }
  .email {
    padding-left: 6px;
    font-size: 13px;
    color: #333333;
    transform: scale(.9);
  }
  .role {
    color: #ccc;
    font-size: 12px;
    padding-left: 5px;
  }
  .account-dropdown .el-dropdown-menu__item::before {
    display: none;
  }
</style>