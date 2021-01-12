<template>
  <div class="container-full">
    <div class="login-box">
      <div class="title">后台管理系统</div>
      <el-form ref="form" :model="model" :rules="rules" label-width="0" class="login-form" @keydown.enter.native="sunbmit('form')">
        <el-form-item prop="username">
          <el-input v-model="model.username" size="small" placeholder="请输入账号">
            <el-button slot="prepend" icon="el-icon-user-solid" />
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="model.password" type="password" size="small" placeholder="请输入密码">
            <el-button slot="prepend" class="iconfont iconmima" />
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" class="btn-full" @click="sunbmit('form')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      model: {
        username: 'liudehua',
        password: '123456'
      },
      rules: {
        username: [{ required: true, message: '请输入账号' }],
        password: [{ required: true, message: '请输入密码' }]
      }
    }
  },
  methods: {
    sunbmit(form) {
      this.$refs[form].validate(async (valid) => {
        if (!valid) return
        const result = await this.$http.post('/login', this.model)
        if (!result) return
        const data = result.data.data
        const token = result.headers.token
        this.$store.commit('user/SET_USERINFO', [
          { key: 'roles', value: data.roles },
          { key: 'token', value: token },
          { key: 'username', value: data.username }
        ])
        this.$router.push('/')
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
      .btn-full{
        width: 100%;
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
