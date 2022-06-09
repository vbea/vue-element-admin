<template>
  <div class="container">
    <div class="content">
      <div class="form-container">
        <div class="form-content">
          <img class="img-logo" src="@/assets/logo.png" />
          <div class="greetings">
            Welcome to Vue Admin
          </div>
          <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
            <el-form-item label="Email" prop="email">
              <el-input v-model="loginForm.email" />
            </el-form-item>
            <el-form-item
              label="Password"
              prop="password"
              aria-autocomplete="false"
            >
              <el-input
                show-password
                v-model="loginForm.password"
                @keydown.enter.native="onClickLoginButton"/>
            </el-form-item>
            <div class="remermber-me">
              <el-checkbox label="Remember me" v-model="checked" />
            </div>
            <el-button
              :loading="loading"
              class="button"
              @click="onClickLoginButton">
              Login
            </el-button>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import { validEmail } from '@/utils/validate'
import router, { constantRoutes, asyncRoutes, resetRouter } from '@/router'
import {
  getUserAccount,
  getUserResource,
  removeUserAccount,
  saveUserAccount,
} from '@/utils/userInfo'
export default {
  name: 'Login',
  data() {
    const checkPassword = (rule, value, callback) => {
      if (value && value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    const checkEmail = (rule, value, callback) => {
      if (!validEmail(value)) {
        callback(new Error('Please type correct email'))
      } else {
        callback()
      }
    }
    return {
      redirect: undefined,
      otherQuery: undefined,
      loginForm: {
        email: 'test@email.com',
        password: '',
      },
      checked: false,
      loginRules: {
        email: [
          {
            required: true,
            trigger: 'blur',
            message: 'Email is required',
          },
          {
            validator: checkEmail,
            trigger: 'blur',
          },
        ],
        password: [
          {
            required: true,
            trigger: 'blur',
            message: 'Please type Password',
          },
          {
            validator: checkPassword,
            trigger: 'blur',
          },
        ],
      },
      loading: false,
      remermberMe: false,
    }
  },
  created() {

  },
  computed: {
    //...mapUserState(['resources']),
  },
  methods: {
    onClickLoginButton() {
      this.$refs.loginForm.validate((valid, errorFields) => {
        if (valid) {
          this.login()
        } else {
          this.$message({
            message: errorFields[Object.keys(errorFields)[0]][0].message,
            type: 'error',
          })
        }
      })
    },
    login() {
      store.dispatch('user/login', this.loginForm)
      .then(() => {
        //this.handleRemerberMe()
        console.log('登录成功');
        resetRouter()
        //const resources = getUserResource()
        this.$store.dispatch('permission/GENERATE_ROUTES', asyncRoutes).then(() => {
          console.log('登录成功');
          //router.addRoutes(accessRoutes)
          this.$router.push({ path: '/' }); //this.$router.push({path: '/dashboard'})
        })
      })
      .catch((error) => {
        this.$message.error(error)
      })
      .finally(() => {
        this.loading = false
      })
    }
  },
}
</script>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #F0F0F0;
}
.content {
  display: flex;
  height: 100%;
  height: 600px;
  background-color: white;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
}
.form-container {
  flex: 1;
  display: flex;
  padding: 50px;
  border: 5px salmon;
}
.form-content {
  display: block;
  flex: 1;
  align-items: flex-start;
}
.img-logo {
  width: 48px;
  height: 48px;
}
.greetings {
  padding-top: 10px;
  padding-bottom: 60px;
  font-family: sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 33px;
  color: #313348;
}
.button {
  margin-top: 33px;
  width: 335px;
  height: 50px;
  background: #1867C0;
  border-radius: 2px;

  font-family: sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  color: #ffffff;
}

.el-checkbox__lable {
  width: 98px;
  height: 20px;
  font-family: sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 19px;
  display: flex;
  align-items: center;
  color: #313348;
}

.el-form-item {
  &:first-child {
    margin-bottom: 16px;
  }

  .el-input {
    width: 335px;
    height: 42px;
    background: #f7f7f7;
    border-radius: 2px;
  }
}
</style>
<style>
.el-form-item__label {
  font-family: sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 22px;
  color: #313348;
  padding-bottom: 8px;
}
</style>
