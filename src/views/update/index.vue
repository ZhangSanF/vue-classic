/**
* errorType:
* 0.玩法维护
* 2.网络繁忙
* 3.暂无数据
* 4.系统繁忙
* 5.功能开发中
*/
<template>
  <div class="update-page">
    <div class="content">
      <div>
          <!--玩法维护-->
          <i  v-if="playMaintenance.question_reason == '0'" class="iconfont icon-saishiweihu weihu"></i>

          <!--暂无数据-->
          <i v-if="playMaintenance.question_reason == '3'" class="iconfont icon-no_content weihu"></i>

          <!--网络繁忙-->
          <!--<i class="iconfont icon-no_network weihu"></i>-->

          <!--系统繁忙-->
          <!--<i class="iconfont icon-busy weihu"></i>-->

          <!--功能开发中-->
          <!--<i class="iconfont icon-wait weihu"></i>-->
      </div>
      <!--玩法维护-->
      <p v-if="playMaintenance.question_reason == '0'">
        <span class="title">很抱歉，投注页面正在维护中。</span><br/>
        <span class="content">预计将会 <font>{{playMaintenance.endTime}}（GMT+8) </font>完成<br/>
        感谢您的耐心等待！
        </span>
      </p>

      <!--暂无数据-->
      <p v-if="playMaintenance.question_reason == '3'">
        <span class="title">暂无数据</span><br/>
        <span class="content">您所在的页面当前无数据</span>
      </p>

      <!--网络繁忙-->
      <!--<p>-->
        <!--<span class="title">网络不给力</span><br/>-->
        <!--<span class="content">世界上最遥远的距离，莫过于网路不给力</span>-->
      <!--</p>-->

      <!--系统繁忙-->
      <!--<p>-->
        <!--<span class="title">系统繁忙</span><br/>-->
        <!--<span class="content">服务器开了个小差 , 请您重新加载</span>-->
      <!--</p>-->

      <!--功能开发中-->
      <!--<p>-->
        <!--<span class="title">还没有这个功能哦</span><br/>-->
        <!--<span class="content">该功能目前正在开发中…</span>-->
      <!--</p>-->

      <!--按钮-->
      <div v-if="playMaintenance.question_reason == '3'" class="noData-btn" @click="update">刷新</div>
    </div>
  </div>
</template>

<script>
  import { XHeader } from 'vux'
  import MyFooter from '@/components/Footer.vue'
  import util from '../../js/util/util'
  import {store,process} from "@/js/public/port"

  export default{
    components: {
      'my-footer': MyFooter, XHeader
    },

    methods: {
      update(){
        process.getData();
      }
    },
    mounted () {
    //  this.$store.state.common.gameTypeData.ItemNumShow=false;
    //  this.$store.state.common.gameTypeData.TimerNumShow=true;
    },
    computed:{
      playMaintenance(){
        return store.state.playMaintenance;
      }
    }
  }

</script>
