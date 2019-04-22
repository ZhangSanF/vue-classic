<!--游戏维护-->
<template>
  <div class="ip-limit-page">
    <x-header :left-options="{backText: ''}">禁止访问</x-header>
    <div class="wrap">
      <div class="content">
        <h1>所在地区禁止访问</h1>
        <p class="english_tit">Access to this IP has been restricted due</p>
        <img width="50%" src="static/images/ip-limit.png" alt="">
        <p>尊敬的玩家们:
          <br>
          {{message}}
          <br>
          抱歉!您所在的地区无法访问到该页面,造成不便,敬请见谅。如有疑问,请致电客服热线咨询。
        </p>
      </div>
      <my-footer></my-footer>
    </div>
  </div>
</template>

<script>
  import { XHeader } from 'vux'
  import MyFooter from '@/components/Footer.vue'

  export default{
    components: {
      'my-footer': MyFooter, XHeader
    },
    data () {
      return {
        message : ''
      }
    },
    mounted () {
      this.message = this.$route.query.param.message;
    }
  }

</script>
