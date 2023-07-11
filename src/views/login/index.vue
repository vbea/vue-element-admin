<template>
  <div class="container">
    <div class="content">
      <div class="form-container">
        <div class="form-content">
          <img class="img-logo" src="@/assets/logo.png" />
          <div class="greetings">
            Welcome to {{appName}}
          </div>
          <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="loginRules">
            <el-form-item
              prop="email">
              <div class="form-login-input">
                <span class="svg-container">
                  <svg-icon icon-class="email" />
                </span>
                <el-input
                  name="email"
                  v-model="loginForm.email"
                  type="text"
                  tabindex="1"
                  clearable
                  maxlength="50"
                  @focus="() => focusFiled.email = true"
                  @blur="() => focusFiled.email = false"
                />
                <label :class='isNameValid ? "focus" : ""'>Email</label>
              </div>
            </el-form-item>
            <el-form-item
              prop="password"
              aria-autocomplete="false">
              <div class="form-login-input">
                <span class="svg-container">
                  <svg-icon icon-class="password" />
                </span>
                <el-input
                  ref="password"
                  tabindex="2"
                  :type="passwordType"
                  v-model="loginForm.password"
                  autocomplete="off"
                  clearable
                  maxlength="32"
                  @keydown.enter.native="onClickLoginButton"
                  @focus="() => focusFiled.password = true"
                  @blur="() => focusFiled.password = false"/>
                <span class="show-pwd" @click="showPwd">
                  <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                </span>
                <label :class='isPsdValid ? "focus" : ""'>Password</label>
              </div>
            </el-form-item>
            <!--div class="remermber-me">
              <el-checkbox label="Remember me" v-model="remermberMe" />
            </div-->
            <el-button
              :loading="loading"
              type="primary"
              class="login-button"
              @click="onClickLoginButton">
              Login
            </el-button>
          </el-form>
        </div>
      </div>
    </div>
    <div class="copyinfo">©{{copyYear}}&nbsp; {{company}}</div>
  </div>
</template>

<script>
import store from '@/store'
import { validEmail } from '@/utils/validate'
import { getEmail } from '@/utils/auth.js'
import permission from '@/utils/permission.js'
import settings from '../../settings.js'
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
      year: settings.year,
      appName: settings.title,
      company: settings.company,
      redirect: undefined,
      otherQuery: undefined,
      appName: settings.title,
      loginForm: {
        email: '',
        password: '',
      },
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
      focusFiled: {
        email: false,
        password: false
      },
      passwordType: "password"
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    const user = getEmail()
    if (user) {
      this.loginForm.email = user;
    }
  },
  mounted() {
    if (this.loginForm.email === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  computed: {
    //...mapUserState(['resources']),
    copyYear() {
      const year = new Date().getFullYear();
      if (year > this.year) {
        return this.year + "-" + year;
      } else {
        return this.year;
      }
    },
    isNameValid() {
      return (this.loginForm.email !== "" || this.focusFiled.email)
    },
    isPsdValid() {
      return (this.loginForm.password !== "" || this.focusFiled.password)
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = 'text'
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
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
      store.dispatch('user/login', this.loginForm).then((res) => {
        //this.handleRemerberMe()
        console.log('登录成功', res);
        let path = this.redirect || '/'
        if (res.data.resources.length > 0) {
          store.commit('permission/SET_ROUTES', res.data.resources);
          let validPath = false;
          for (let _route of res.data.resources) {
            if (path.indexOf(_route[permission.RESOURCE_KEY]) >= 0) {
              validPath = true;
              break
            }
          }
          if (!validPath) {
            path =  res.data.resources[0][permission.RESOURCE_KEY];
          }
        }
        this.$router.push({
          path: path,
          query: this.otherQuery,
        }).catch((failure) => {
          /*if (!isNavigationFailure(failure, NavigationFailureType.redirected)) {
            throw failure
          }*/
        })
      }).catch((error) => {
        this.$message.error(error.message || error)
      }).finally(() => {
        this.loading = false
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
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
  padding-bottom: 40px;
  font-family: sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 33px;
  color: #313348;
}
.login-button {
  width:100%;
  color: #fff;
  padding: 15px;
  margin-top: 40px;
  margin-bottom: 20px;
  font-weight: bold;
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
  .form-login-input {
    width: 100%;
    display: flex;
    padding: 0 10px;
    margin-top: 20px;
    position: relative;
    align-items: center;
    border-bottom: 1px solid #999;
    label {
      top: 0;
      left: 0;
      color: #aaa;
      font-size: 14px;
      position:absolute;
      padding-top: 7px;
      padding-left: 45px;
      font-weight: normal;
      pointer-events: none;
      transition: all 0.3s;
    }
    label.focus {
    	top: -30px;
    	color: #333;
    	font-size: 15px;
      font-weight: bold;
      padding-left: 5px;
    }
    .svg-container {
      width: 30px;
      color: #333;
      font-size: 16px;
      padding: 6px 6px 6px 5px;
    }
    .el-input {
      flex: 1;
      height: 42px;
    
      &::v-deep input {
        color: #333;
        height: 42px;
        border: none;
        font-size: 14px;
        padding: 0 5px;
        border-radius: 0px;
        -webkit-appearance: none;
        background: transparent;
      }
    }
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
.copyinfo {
  left: 0;
  right: 0;
  bottom: 10px;
  color: #999;
  font-size: 12px;
  user-select: none;
  text-align: center;
  position: absolute;
  transform: scale(.8);
}
</style>
