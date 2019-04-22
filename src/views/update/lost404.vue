<!--游戏维护-->
<template>
  <div class="lost404-page">
    <x-header :left-options="{backText: ''}">页面不存在</x-header>
    <div class="wrap">
      <div class="content">
        <img src="static/images/404.png" alt="">
        <h1>Page not found</h1>
        <p>抱歉！您访问的页面不存在，如有造成不便，敬请见谅。</p>
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
      }
    },
    methods: {
    },
    mounted () {
    }
  }

</script>
