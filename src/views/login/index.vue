<template>
  <div class="container-full">
    <div class="login-box">
      <div class="title">后台管理系统</div>
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" label-width="0" class="login-form" @keydown.enter.native="sunbmitEvent('loginForm')">
        <el-form-item prop="account">
          <el-input v-model="loginForm.username" size="small" placeholder="请输入账号">
            <el-button slot="prepend" icon="el-icon-user-solid" />
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password" size="small" placeholder="请输入密码">
            <el-button slot="prepend" icon="el-icon-s-shop" />
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" class="btn-full" :loading="loginLoading" @click="sunbmitEvent('loginForm')">{{ loginText }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: '12313'
      },
      loginRules: {
        username: [{ required: true }],
        password: [{ required: true }]
      }
    }
  },
  computed: {
    ...mapState({
      loginText: state => state.user.loginText,
      loginLoading: state => state.user.loginLoading
    })
  },
  mounted() {
    console.log(this.loginText)
  },
  methods: {
    sunbmitEvent(form) {
      this.$refs[form].validate((valid) => {
        if (!valid) return
        this.$store.dispatch('user/login', this[form]).then(res => {
          this.$router.push({ path: '/' })
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .container-full{
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f8f8f9;
    .login-box{
      width: 320px;
      border-radius: 8px;
      box-shadow: 2px 2px 10px rgba(0,0,0,.2);
      background-color: #fff;
      .title{
        text-align: left;
        padding: 14px 16px;
        border-bottom: 1px solid #e8eaec;
        line-height: 1;
      }
    }
  }
</style>
<style lang="scss">
  .login-form{
      padding: 15px;
      .el-input-group__prepend{
        text-align: center;
      }
    }
</style>
