<template>
  <!--
0:玩法维护
1:系统维护
2:系统升级
3:暂无数据
4:功能开发中
5:暂无网络
6:系统繁忙
-->
  <div>
    <secondary-head :title="title"></secondary-head>
    <div class="question-box">
      <div class="question-content">
        <!--图标-->
        <i v-if="state === '0'" class="iconfont icon-saishiweihu icon-style"></i>
        <i v-else-if="state === '1'" class="iconfont icon-maintain icon-style"></i>
        <i v-else-if="state === '2'" class="iconfont icon-upgrade icon-style"></i>
        <i v-else-if="state === '3'" class="iconfont icon-no_content icon-style"></i>
        <i v-else-if="state === '4'" class="iconfont icon-wait icon-style"></i>
        <i v-else-if="state === '5'" class="iconfont icon-no_network icon-style"></i>
        <i v-else-if="state === '6'" class="iconfont icon-busy icon-style"></i>
        <i v-else-if="state === '7'" class="iconfont icon-ip_ban icon-style"></i>
        <i v-else-if="state === '8'" class="iconfont icon-areas_prohibited icon-style"></i>
        <!--标题-->
        <div class="title">玩法维护</div>
        <!--提示内容-->
        <!--<div class="content">您所在的页面当前无数据</div>-->
        <div class="content">预计将会在 <span class="time-red">2018-08-01 12:00:00（GMT+8）</span> 完成，感谢您的耐心等待</div>
        <!--按钮-->
        <div>
          <span v-if="state === '3' || state === '4'" class="btn">返回</span>
          <span v-else-if="state === '5'" class="btn">刷新</span>
          <span v-else-if="state === '6'" class="btn">重试</span>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  import SecondaryHead from '@/components/SecondaryHead'
  export default{
    components: {
      SecondaryHead
    },
    data: function () {
      return {
        title:'缺省页',
        state:'7'
      }
    },
    methods: {

    }
  }
</script>

<style scoped lang="scss">
  .question-box{position: fixed;top: 64px;left: 0;right: 0;bottom: 0;
    .question-content{position: absolute;top:50%;left: 50%;transform: translate(-50%,-50%);width: 80%;text-align: center;
      .icon-style{font-size:100px;color: #A28069;display: inline-block;height:100px;vertical-align:text-top;line-height: 100px}
      .title{font-size: 18px;color: #513F33;height: 30px;line-height: 30px}
      .content{font-size: 13px;color: #999999;
        .time-red{color: #C7270A;font-size: 13px}
      }
      .btn{background: #E5E0DC;display: inline-block;padding: 9px 27px;border-radius: 4px;font-size: 16px;color: #333333;margin-top: 20px}
    }
  }
</style>
