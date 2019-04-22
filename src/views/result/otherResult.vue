<template>
  <div v-if="otherResult.length !== 0">
    <div v-for="(item, index) in otherResult" :key="index">
      <cell :title="item.mName" is-link :border-intent="false" v-if="index === 0 || item.leaId != otherResult[index-1].leaId" :arrow-direction="isShow ? 'up' : 'down'"  @click.native="isShow = !isShow"></cell>
      <div class="slide" :class="isShow?'animate':''">
        <div class="res-list">
          <div class="title-info" v-if="index === 0 || item.leaId != otherResult[index-1].leaId">
            <div class="info-time">时间</div>
            <div class="info-result">赛果</div>
          </div>
          <table border="1px" style="width: 100%!important;table-layout:fixed;box-sizing: border-box!important;" class="other">
            <tr style="width: 15%!important;table-layout:fixed;box-sizing: border-box!important;">
              <td rowspan="4" >{{matTime(item.startTime,'MD')}} {{matTime(item.startTime,'hm')}}</td>
            </tr>
            <tr class="team" style="width: 25%!important;table-layout:fixed;box-sizing: border-box!important;">
              <td style="white-space:nowrap">比赛队伍</td>
              <td >{{item.hTeam}}</td>  <!--<font class="red"></font>-->
              <td >{{item.gTeam}}</td>
            </tr>
            <tr style="width: 30%!important;table-layout:fixed;box-sizing: border-box !important;">
              <td>半场</td>
              <td>{{item.huH}}</td>
              <td>{{item.huG}}</td>
            </tr>
            <tr style="width: 30%!important;table-layout:fixed;box-sizing: border-box!important;">
              <td>全场</td>
              <td><font class="red">{{item.fullH}}</font></td>
              <td><font class="red">{{item.fullG}}</font></td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
  <div class="no-result-div" v-else>
    <p class="no-result-p">
      您选择的球类日期暂时没有赛果信息。
    </p>
  </div>
</template>

<script>
  import {Cell, CellBox, Tab, TabItem} from 'vux'
  import {Util} from '../../router/api'
  export default {
    name: "other-result",
    components:{
      Cell,
      CellBox,
      Tab,
      TabItem
    },
    props:['resultData'],
    data() {
      return {
        otherResult:[],
        isShow:false
      }
    },
    methods:{
      matTime(time,type){
        let date = new Date(time).getTime();
        let resultDate = Util.formatDate.UnixToDate(date,0,type);
        return resultDate.trim()
      },
      displayResult(showContent){
        this.$emit('showResult', showContent, this.otherResult)
      }
    },
    mounted() {
      this.otherResult=this.resultData
    },
    watch: {
      resultData: function () {
        this.otherResult=this.resultData
      }
    }
  }
</script>
