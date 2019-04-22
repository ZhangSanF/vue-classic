<template>
  <div v-if="tennisResult.length !== 0">
    <div v-for="(item, index) in tennisResult" :key="index">
      <cell :title="item.mName" is-link :border-intent="false" v-if="index === 0 || item.leaId != tennisResult[index-1].leaId" :arrow-direction="isShow ? 'up' : 'down'"  @click.native="isShow = !isShow"></cell>
      <div class="slide" :class="isShow?'animate':''">
        <div class="res-list">
          <div class="title-info" v-if="index === 0 || item.leaId != tennisResult[index-1].leaId">
            <div class="info-time">时间</div>
            <div class="info-result">赛果</div>
          </div>
          <table border="1px" style="width: 100%" class="tennis">
            <tr>
              <td rowspan="10" width="19%">{{matTime(item.startTime,'MD')}} {{matTime(item.startTime,'hm')}}</td>
            </tr>
            <tr class="team">
              <td style="white-space:nowrap">比赛队伍</td>
              <td width="35%">{{item.hTeam}}</td>  <!--<font class="red"></font>-->
              <td width="35%">{{item.gTeam}}</td>
            </tr>
            <tr>
              <td>第一盘</td>
              <td>{{item.s1H}}</td>
              <td>{{item.s1G}}</td>
            </tr>
            <tr>
              <td>第二盘</td>
              <td>{{item.s2H}}</td>
              <td>{{item.s2G}}</td>
            </tr>
            <tr>
              <td>第三盘</td>
              <td>{{item.s3H}}</td>
              <td>{{item.s3G}}</td>
            </tr>
            <tr>
              <td>第四盘</td>
              <td>{{item.s4H}}</td>
              <td>{{item.s4G}}</td>
            </tr>
            <tr>
              <td>第五盘</td>
              <td>{{item.s5H}}</td>
              <td>{{item.s5G}}</td>
            </tr>
            <tr>
              <td>让局</td>
              <td>{{item.numberwinH}}</td>
              <td>{{item.numberwinG}}</td>
            </tr>
            <tr>
              <td>赛局球员:大小</td>
              <td>{{item.numberwinH}}</td>
              <td>{{item.numberwinG}}</td>
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
    name: "tennis-result",
    components:{
      Cell,
      CellBox,
      Tab,
      TabItem
    },
    props:['resultData'],
    data() {
      return {
        tennisResult:[],
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
        this.$emit('showResult', showContent, this.tennisResult)
      }
    },
    mounted() {
      this.tennisResult=this.resultData
    },
    watch: {
      resultData: function () {
        this.tennisResult=this.resultData
      }
    }
  }
</script>
