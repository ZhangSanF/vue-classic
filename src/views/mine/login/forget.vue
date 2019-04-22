<template>

  <div class="forget-page passport">
    <x-header class="header" :left-options="{backText:' '}"> 忘记密码 </x-header>
    <div class="box">
      <form>
        <div class="form-row">
          <div class="form-row-tit">用户名</div>
          <input type="username"  placeholder="请输入用户名">
        </div>
        <div class="form-row">
          <div class="form-row-tit">邮箱</div>
          <input type="email"  placeholder="请输入邮箱">
        </div>
        <div class="form-row">
          <div class="form-row-tit">手机号码</div>
          <input type="phone"  placeholder="请输入手机号码">
        </div>

        <div class="form-row">
          <div class="form-row-tit">输入新密码</div>
          <input type="password"  placeholder="请输入新密码">
        </div>
        <div class="form-row">
          <div class="form-row-tit">确认新密码</div>
          <input type="password"  placeholder="请再次输入新密码">
        </div>
        <button  class="btn-regist" >找回密码</button>
      </form>
    </div>
  </div>

</template>

<script>

  import { XHeader } from 'vux'

  export default{
    components: {
      XHeader
    }
  }

</script>

<style lang="scss" scoped>
  @import '../../../themes/mine/passport.scss';
</style>
