<template>
  <div v-if="volleyballResult.length !== 0">
    <div v-for="(item, index) in volleyballResult" :key="index">
      <cell :title="item.mName" is-link :border-intent="false" v-if="index === 0 || item.leaId != volleyballResult[index-1].leaId" :arrow-direction="isShow ? 'up' : 'down'"  @click.native="isShow = !isShow"></cell>
      <div class="slide" :class="isShow?'animate':''">
        <div class="res-list">
          <div class="title-info" v-if="index === 0 || item.leaId != volleyballResult[index-1].leaId">
            <div class="info-time">时间</div>
            <div class="info-result">赛果</div>
          </div>
          <table border="1px" style="width: 100%" class="volleyball">
            <tr>
              <td rowspan="11" width="19%">{{matTime(item.startTime,'MD')}} {{matTime(item.startTime,'hm')}}</td>
            </tr>
            <tr class="team">
              <td style="white-space:nowrap">比赛队伍</td>
              <td width="35%">{{item.hTeam}}</td>  <!--<font class="red"></font>-->
              <td width="35%">{{item.gTeam}}</td>
            </tr>
            <tr>
              <td>分数</td>
              <td>{{item.numberwinH}}</td>
              <td>{{item.numberwinG}}</td>
            </tr>
            <tr>
              <td>第一局</td>
              <td>{{item.s1H}}</td>
              <td>{{item.s1G}}</td>
            </tr>
            <tr>
              <td>第二局</td>
              <td>{{item.s2H}}</td>
              <td>{{item.s2G}}</td>
            </tr>
            <tr>
              <td>第三局</td>
              <td>{{item.s3H}}</td>
              <td>{{item.s3G}}</td>
            </tr>
            <tr>
              <td>第四局</td>
              <td>{{item.s4H}}</td>
              <td>{{item.s4G}}</td>
            </tr>
            <tr>
              <td>第五局</td>
              <td>{{item.s5H}}</td>
              <td>{{item.s5G}}</td>
            </tr>
            <tr>
              <td>第六局</td>
              <td>{{item.huH}}</td>
              <td>{{item.huG}}</td>
            </tr>
            <tr>
              <td>第七局</td>
              <td>{{item.hdH}}</td>
              <td>{{item.hdG}}</td>
            </tr>
            <tr>
              <td>完赛</td>
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
    name: "volleyball-result",
    components:{
      Cell,
      CellBox,
      Tab,
      TabItem
    },
    props:['resultData'],
    data() {
      return {
        volleyballResult:[],
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
        this.$emit('showResult', showContent, this.volleyballResult)
      }
    },
    mounted() {
      this.volleyballResult=this.resultData
    },
    watch: {
      resultData: function () {
        this.volleyballResult=this.resultData
      }
    }
  }
</script>
