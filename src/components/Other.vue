<template>
  <div class="zhedie footballShow" v-if="matchesMsg != '' && !matchesMsg.playMaintenance">
    <input hidden="hidden" :value="clirdShow"/>
    <div class="border" v-for="(matches, teamName) in matchesMsg" :key="teamName" :ref="matches.showContent">
      <cell :title=teamName is-link :border-intent="false"
            :arrow-direction="matches.maxHeight.animate ? 'up' : 'down'"
            @click.native="showContent(matches.showContent)"
            value-align="right"
      ><span style="color: #FFFFFF;font-size: 15px;">{{matches.sum}}</span></cell>
      <div :class="matches.maxHeight" v-for="(matchesInfo,key) in matches" :key="key+'o'+matchesInfo.id">
        <!--<div class="ball_nei">-->
          <!--<p>-->
            <!--<span class="ball_title">-->
              <!--&nbsp;-->
              <!--<span style="margin-left: 8px;float: left" v-if="dataType != 1">{{forMatDate(matchesInfo.startTime)}}</span>-->
              <!--<span v-if="matchesInfo.isLive == 1" class="data-Live">滚球</span>-->
            <!--</span>-->
            <!--<span class="ball_rq">让球</span>-->
            <!--<span class="ball_dx">大小</span>-->
          <!--</p>-->
        <!--</div>-->
        <div class="play-title" v-if="key == 0 || matchesInfo.leagueId != matches[key-1].leagueId">
          <div class="play-content">
            <span>让球</span>
            <span>大小</span>
          </div>
        </div>
        <div class="ball_cont">
          <div class="ball_dan_c">
            <div class="ball_dan_t">
              <div @click="goToMorePlay(matchesInfo)">
        <!--      <router-link class='link'
                           :to="{path:'/moreTYQT',query:{url:'/moreTYQT',type:dataType, params:{obj1: matchesInfo, obj2: reqParams}}}">-->
                <div class="dc_nei">
                  <span class="banchang" v-if="dateType == 1"></span>
                  <span class="banchang" v-if="dateType != 1">{{forMatDate(matchesInfo.startTime)}}</span>
                  <span class="add_f">+{{matchesInfo.morePlayNum ? matchesInfo.morePlayNum : '0'}} <i class="arrows"></i></span></div>
                <div class="teama"><p name="team">{{matchesInfo.hteam}}</p><span class="win">{{matchesInfo.hscore}}</span></div>
                <div class="teama"><p name="team">{{matchesInfo.gteam}}</p><span class="win">{{matchesInfo.gscore}}</span></div>
             <!-- </router-link>-->
              </div>
            </div>
            <div class="ball_dan_cnt">
              <div class="rqa">
                <!--v-if="playType.qcrq in gamePlayObj" -->
                <p class="team_rq" :class="{ggSelect: isMix == 1 &&  checkedMatches[matchesInfo.onlykey + matchesInfo.matchesDetailId + playType.qcrq + (matchesInfo.dStrong=='H' ? '0' : '2')]}"  to='/' @click="betDialogHandler(matchesInfo,playType.host,playType.qcrq,'qcrq',matchesInfo.dIorRH)">
                  <span class="rq_b">
                    <i class="d-rq-l" v-if="matchesInfo.dStrong == 'H'">{{(playType.qcrq in gamePlayObj)? matchesInfo.dRatio:''}}</i><i></i>
                  </span>
                  <span v-if="oddsSelect() === 'oddsCss1' && matchesInfo.dIorRH" :class="matchesInfo.dIorRH <0 ?'rq_zN':'rq_z'"
                        :style="({color:oddsChangeClass(teamName, key,'dIorRH_change')})">
                        {{(playType.qcrq in gamePlayObj)? formatOdds(matchesInfo.dIorRH):'-'}}
                      </span>
                  <span v-if="oddsSelect() === 'oddsCss2' && matchesInfo.dIorRH" :class="matchesInfo.dIorRH <0 ?'rq_zN':'rq_z'" :style="({color:oddsChangeClass(teamName, key,'dIorRH_change')})">
                  <i :class="oddsChangeTag(teamName, key,'dIorRH_change')"></i>
                       {{(playType.qcrq in gamePlayObj)? formatOdds(matchesInfo.dIorRH):'-'}}
                  </span>
                  <span class="rq_z" v-if="!matchesInfo.dIorRH">-</span>
                </p>
              <!--  <p v-if="!(playType.qcrq in gamePlayObj)"  class="team_rq">
                  <span class="rq_b"><i></i><i></i></span>
                  <span class="rq_z"></span>
                </p>-->
                <!--v-if="playType.qcdx in gamePlayObj" -->
                <p class="team_dx" :class="{ggSelect: isMix == 1 &&  checkedMatches[matchesInfo.onlykey + matchesInfo.matchesDetailId + playType.qcdx + '0']}"  to='/' @click="betDialogHandler(matchesInfo,playType.host,playType.qcdx,'dxz',matchesInfo.dIorOUH)">
                  <span class="dx_b"><i class="dx_a" v-show="matchesInfo.dRatioO !== undefined">{{(playType.qcdx in gamePlayObj)? '大':''}}</i><i class="dx_c">{{(playType.qcdx in gamePlayObj)? matchesInfo.dRatioO:''}}</i></span>
                  <span v-if="oddsSelect() === 'oddsCss1' && matchesInfo.dIorOUH" :class="matchesInfo.dIorOUH <0 ?'dx_zN':'dx_z'"
                        :style="({color:oddsChangeClass(teamName, key,'dIorOUH_change')})">
                        {{(playType.qcdx in gamePlayObj)? formatOdds(matchesInfo.dIorOUH):'-'}}
                      </span>
                  <span v-if="oddsSelect() === 'oddsCss2' && matchesInfo.dIorOUH" :class="matchesInfo.dIorOUH <0 ?'dx_zN':'dx_z'" :style="({color:oddsChangeClass(teamName, key,'dIorOUH_change')})">
                  <i :class="oddsChangeTag(teamName, key,'dIorOUH_change')"></i>
                        {{(playType.qcdx in gamePlayObj)? formatOdds(matchesInfo.dIorOUH):'-'}}
                  </span>
                  <span  class="dx_z" v-if="!matchesInfo.dIorOUH">-</span>
                </p>
               <!-- <p v-if="!(playType.qcdx in gamePlayObj)" class="team_dx">
                  <span class="dx_b"><i class="dx_a"></i><i class="dx_c"></i></span>
                  <span class="dx_z"></span>
                </p>-->
              </div>
              <div class="rqb">
                <p class="team_rq" :class="{ggSelect: isMix == 1 &&  checkedMatches[matchesInfo.onlykey + matchesInfo.matchesDetailId + playType.qcrq + (matchesInfo.dStrong=='H' ? '1' : '3')]}"  to='/' @click="betDialogHandler(matchesInfo,!playType.host,playType.qcrq,'qcrq',matchesInfo.dIorRC)">
                  <span class="rq_b">
                    <i class="d-rq-l" v-if="matchesInfo.dStrong == 'C'">{{(playType.qcrq in gamePlayObj)? matchesInfo.dRatio:''}}</i><i></i>
                  </span>
                  <span v-if="oddsSelect() === 'oddsCss1' && matchesInfo.dIorRC" :class="matchesInfo.dIorRC <0 ?'rq_zN':'rq_z'"
                        :style="({color:oddsChangeClass(teamName, key,'dIorRC_change')})">
                        {{(playType.qcrq in gamePlayObj)? formatOdds(matchesInfo.dIorRC):'-'}}
                      </span>
                  <span v-if="oddsSelect() === 'oddsCss2' && matchesInfo.dIorRC" :class="matchesInfo.dIorRC <0 ?'rq_zN':'rq_z'" :style="({color:oddsChangeClass(teamName, key,'dIorRC_change')})">
                  <i :class="oddsChangeTag(teamName, key,'dIorRC_change')"></i>
                       {{(playType.qcrq in gamePlayObj)? formatOdds(matchesInfo.dIorRC):'-'}}
                  </span>
                  <span  class="rq_z" v-if="!matchesInfo.dIorRC">-</span>
                </p>
              <!-- <p v-if="!(playType.qcrq in gamePlayObj)"  class="team_rq">
                  <span class="rq_b"><i></i><i></i></span>
                  <span class="rq_z"></span>
                </p>-->
                <p  class="team_dx" :class="{ggSelect: isMix == 1 && checkedMatches[matchesInfo.onlykey + matchesInfo.matchesDetailId + playType.qcdx + '1']}"  to='/' @click="betDialogHandler(matchesInfo,!playType.host,playType.qcdx,'dxk',matchesInfo.dIorOUC)">
                  <span class="dx_b"><i class="dx_a" v-show="matchesInfo.dRatioU !== undefined">{{(playType.qcdx in gamePlayObj)? '小':''}}</i><i class="dx_c">{{(playType.qcdx in gamePlayObj)? matchesInfo.dRatioU:''}}</i></span>
                  <span v-if="oddsSelect() === 'oddsCss1' && matchesInfo.dIorOUC" :class="matchesInfo.dIorOUC <0 ?'dx_zN':'dx_z'"
                        :style="({color:oddsChangeClass(teamName, key,'dIorOUC_change')})">
                        {{(playType.qcdx in gamePlayObj)? formatOdds(matchesInfo.dIorOUC):'-'}}
                      </span>
                  <span v-if="oddsSelect() === 'oddsCss2' && matchesInfo.dIorOUC" :class="matchesInfo.dIorOUC <0 ?'dx_zN':'dx_z'" :style="({color:oddsChangeClass(teamName, key,'dIorOUC_change')})">
                  <i :class="oddsChangeTag(teamName, key,'dIorOUC_change')"></i>
                       {{(playType.qcdx in gamePlayObj)? formatOdds(matchesInfo.dIorOUC):'-'}}
                  </span>
                  <span  class="dx_z" v-if="!matchesInfo.dIorOUC">-</span>
                </p>
              <!--<p v-if="!(playType.qcdx in gamePlayObj)" class="team_dx">
                  <span class="dx_b"><i class="dx_a"></i><i class="dx_c"></i></span>
                  <span class="dx_z"></span>
                </p>-->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else-if="matchesMsg.playMaintenance" style="height: 280px;">
    <play-maintenance></play-maintenance>
  </div>
  <div class="is_playMaintenance" v-else>
    <play-maintenance></play-maintenance>
  </div>
</template>
<script>
import {Cell} from 'vux'
import Util from '../js/util/util'
import playMaintenance from '../views/update/index'
import {store,process,oddsChange,showBet} from '../js/public/port'

export default {
  data() {
    return {
      oldMsg: {},
      newMsg: {},
      clirdShow:true,
    }
  },
  components: {
    Cell: Cell,
    'play-maintenance': playMaintenance
  },
  methods: {
    betDialogHandler (data, host, type, clickWho,curOdds) {
      showBet.betDialogHandler(data, host, type, clickWho,curOdds);
    },
    goToMorePlay(data){
      process.goToMorePlay(data);
    },
    showContent: function (e) {
      process.childShowTitle(!this.clirdShow, e,this);
    },
    forMatDate (time) {
      return Util.formatDate.UnixToDate(time, -12, 'MDhm')
    },
    formatOdds (data) {
      return Util.formatOdds(data);
    },
    oddsSelect () {
      return oddsChange.methods.oddsSelect()
    },
    //返回颜色
    oddsChangeClass(teamName, key, propertyKey) {
      let oddsC = oddsChange.methods.oddsChangeClass(teamName, key, propertyKey, this);
      let oddClassObj = store.state.oddClassObj;
      return oddClassObj['oddsCss1'][oddsC];
    },
    //返回箭头
    oddsChangeTag(teamName, key, propertyKey) {
      let oddsC = oddsChange.methods.oddsChangeClass(teamName, key, propertyKey, this);
      let oddClassObj = store.state.oddClassObj;
      return oddClassObj['oddsCss2'][oddsC];
    },
  },
  computed:{
    matchesMsg () {
      store.commit('showLoading',false);
      if(store.state.datas){
        return store.state.datas;
      }
      return [];
    },
    gamePlayObj(){
      return store.state.gamePlayObj;
    },
    playType:{
      get: function () {
        return store.state;
      },
      set: function (newValue) {
      }
    },
    /** 玩法类型 0单式 1综合过关 2冠军 */
    isMix: {
      get: function () {
        return store.state.baseParam.isMix;
      }
    },
    dateType:{
      get:function () {
        return store.state.baseParam.dateType;
      }
    },
    /** 综合过关样式 */
    checkedMatches: {
      get: function () {
        return store.state.checkedMatches;
      }
    }
  },
  watch: {
    matchesMsg (now, old) {
      oddsChange.methods.watchMsg(now, old, this);
    }
  }
}
</script>
