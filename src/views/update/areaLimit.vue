/**
* 系统维护中
* 所在地区禁止访问
* IP禁止
* 系统升级
*/
<template>
  <div class="siteUpodate-page">
    <Timer></Timer>
    <div class="top-title">禁止访问</div>
    <div class="question-box">
      <div class="question-content">
        <!--图标--------------------------->
        <!--系统维护中-->
       <!-- <i class="iconfont icon-maintain icon-style"></i>-->

        <!--所在地区禁止访问-->
        <i class="iconfont icon-areas_prohibited icon-style"></i>

        <!--IP禁止-->
        <!--<i class="iconfont icon-ip_ban icon-style"></i>-->

        <!--系统升级-->
       <!-- <i class="iconfont icon-upgrade icon-style"></i>-->

        <!--标题--------------------------->
        <div class="title">所在地区禁止访问</div>

        <!--提示内容--------------------------->
        <!--系统维护中-->
        <!--<div class="content">预计将会在 <span class="time-red">2018-08-01 12:00:00（GMT+8）</span> 完成，感谢您的耐心等待</div>-->

        <!--系统维护中-->
        <!--<div class="content">很抱歉！您所在的地区禁止访问</div>-->

        <!--IP禁止-->
        <!--<div class="content">您的IP被禁止访问</div>-->

        <!--系统升级-->
        <div class="content">
           很抱歉！你所在的地区禁止访问
        </div>

      </div>
    </div>

  </div>
</template>

<script>
  import { XHeader } from 'vux'
  import {store} from "@/js/public/port"
  import Timer from '@/components/Timer.vue'
  export default{
    components: {
      XHeader,Timer
    },
    methods: {
    },
    mounted () {
      this.$vux.loading.hide();
    },
    computed:{
      playMaintenance(){
        return store.state.playMaintenance;
      }
    }
  }

</script>

