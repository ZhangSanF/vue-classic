<template>

  <div class="register-page passport">
    <x-header class="header" :left-options="{backText:' '}">注册</x-header>
    <div class="regist">
      <form>
        <div class="form-row">
          <div class="form-row-tit">用户名</div>
          <input type="username"  placeholder="请输入用户名">
        </div>
        <div class="form-row">
          <div class="form-row-tit">输入密码</div>
          <input type="password"  placeholder="请输入密码">
        </div>
        <div class="form-row">
          <div class="form-row-tit">确认密码</div>
          <input type="password"  placeholder="请再次输入密码">
        </div>
        <button  class="btn-regist" >注册</button>
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
